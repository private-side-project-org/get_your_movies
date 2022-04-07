# Movie search web app

> running with the movie DB(TMDB)

Simple web app that helps you to pick up the movie.

Explore your new movie, and also you can save your favorite movies for movie night.(or marathon whichever...)

## Getting started

Since it's only working local yet, you have to fork or download the repo and run locally.

## Initial Configuration

This webapp is using TMDB, so you have to create account to get api_key to access DB.
Please follow the [instruction](https://developers.themoviedb.org/3/getting-started/introduction) to get api_key first.
Once you get api_key, then create `.env` file in project folder you've downloaded or forked, and set below 2 env variables there.

```shell
API_KEY  # e.g. API_KEY=your_own_api_key
BASE_URL # last number is the version of TMDB you use. e.g. https://api.themoviedb.org/3
```

Once you've set up env, then run blow commands to build project.

```shell
npm i # install all libraries
npm run start # run project locally
access http://localhost:8080
```

Once build is completed, you'll see the input on left top, and just type any keyword inside.
You'll get result and can see the detail with clicking the item.
If you find your favorite movie, you also can save it for listing.
You can see your saved movies from `Your favorite` tab.

## Features

- Get all result including pagination
  - You'll get next page of result with just scrolling. It is infinite loop until the end of page.
- Save/Remove your favorite movie
  - You can both save and remove your favorite movies, save for your movie night, and remove when you get satisfy for the movies.

## Tech used

### Framework

- [React.js](https://reactjs.org/)

### Http request

- [React query](https://react-query.tanstack.com/)

### Style

- [durt-sass](https://sass-lang.com/)

### Bundler

- [webpack](https://webpack.js.org/)

### Transpiler

- [babel](https://babeljs.io/)
