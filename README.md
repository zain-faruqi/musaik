# Musaic

## Overview

Musaic is a web app that allows users to share their favorite artists, playlists, and album with their friends. Users link their Musaic profile to their Spotify account, and select which media they want to feature. A user's profile page shows their selected favorites, 6 month's trailing listening minutes, and last played song.


## Data Model


The application will store Users, Pinned Items

* users will have pinned items for three categories: Albums, Playlists, Songs


An Example User:

```javascript
{
  username: "musicfan67",
  hash: // a password hash,
  pins: // an array of references to each pin category
}
```

An Example Pin Category with Embedded Items:

```javascript
{
  user: // a reference to a User object
  name: "Albums",
  items: [
    { title: "The Wall", artist: "Pink Floyd" image: "TheWall.img"},
    { title: "Bon Voyage", artist: "Melody's Echo Chamber" image: "BonVoyage.img"},
  ],
}
```


## [Link to Commented First Draft Schema](db.js) 

## Wireframes

https://www.figma.com/file/ZsEO5JReVMwngIY4g2uV3b/Musaic-Web?node-id=0%3A1


## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can add my pin my favorite albums, playlists, songs from my Spotify account
4. as a user, I can view my friends' profiles

## Research Topics



* (1 point) Deploy with MongoDB Atlas and Heroku
* (1 point) Hash passwords with bycrptjs
* (1 point) Authenticate users with JWT
* (2 points) Spotify Web API and Playback SDK
    *  All songs, playlists, albums are linked from the users' Spotify account using Spotify Web API
    *  Authenticated Users can play songs from within the app using the Spotify Playback SDK
* (6 points) React.js
    * I'm using React.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points


11 points total out of 8 required points


## [Link to Initial Main Project File](app.js) 


## Annotations / References Used



