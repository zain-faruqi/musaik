require('dotenv').config({ path: 'config.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dbConnection = require('./db');
const searchRoute = require('./routes/search');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const session = require('express-session');
const User = require('./models/user');
const req = require('express/lib/request');

//database connection
dbConnection();

//middleware
app.use(express.json());
app.use(cors({credentials: true, origin: true}));
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/spotify/callback'
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      // asynchronous verification, for effect...
        process.nextTick(() => {
            
        User.findOne({ display_name: profile.displayName }, async (err, user) => {
          if (err) {
            console.log(err);
          }
          if (user) {
            console.log('user found');
            done(null, user);
          } else {
            console.log('user not found');
            const newUser = new User({
              display_name: profile.displayName,
              profileURL: profile.profileUrl,
              image_url: profile.photos[0].value,
              followers: profile.followers,
              country: profile.country,
            });
            await newUser.save((err) => {
              if (err) {
                console.log(err);
              } else {
                console.log('user saved');
                done(null, newUser);
              }
            });
          }
        });
      });
    }
  )
);



//routes
app.use('/api/search', searchRoute);

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-private'],
    showDialog: true
  })
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  }
);

app.get('/getuser', (req, res) => {
    if (req.user) {
    res.send(req.user);
  }
});

if (process.env.NODE_ENV == 'production') {
    console.log(__dirname);
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send(process.env.NODE_ENV);
    });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

