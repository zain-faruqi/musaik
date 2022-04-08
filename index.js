require('dotenv').config({ path: 'config.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dbConnection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const searchRoute = require('./routes/search');

//database connection
dbConnection();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoute);



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

