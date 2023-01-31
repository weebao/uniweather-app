# UniWeather - Personal Project

## Table of contents

- [Overview](#overview)
  - [Introduction](#introduction)
  - [Screenshot](#screenshot)
  - [Features](#features)
  - [Links](#links)
- [My process](#my-process)
  - [Challenges](#challenges)
  - [Highlights](#Highlights)
  - [Built with](#built-with)
- [Author](#author)


## Introduction
This is a website that looks up universities around the world and displays their weather data.

### Screenshot

#### Light mode
![](./src/images/light_mode.png)

#### Dark mode
![](./src/images/dark_mode.jpg)

### Links

- Live Site URL: [UniWeather](https://uniweather-baodang.vercel.app/)

## My process
- I started by working on API fetching. I did this part as homework for one of my classes.
- There are three APIs in total: Universities API (For looking up universities), Geocoding API (For getting the coordinates of those universities), Weather API (For getting the weather data of those coordinates).
- After having the fetching part done, I began working on the website itself.
- Having used CSS, SCSS, and Sass, this time I would like to try some new tools to design my website, which is when I came across Material UI (MUI).
- There are a lot going on with MUI, so I pretty much learned as I went on. 
- I started with making the form, which was surprisingly simple since I can add them as normal components. The form is already styled like a Google form which is also very nice 👍
- Then I began creating a button for toggle light/dark mode using `useState` and styled the Theme components from MUI. I also used `useMemo` to prevent reloading theme between states.
- The rest is to design the layout for the tile that displays weather data for each university, which was the most challenging part because I kept wanting to add more features and the website became laggy.
- After finishing, I added tab navigation and aria labels to make the website more accessible to visually impaired people.

### Challenges
- The first challenge I encountered was the timing between fetches. With queries that result in a large number of results such as "University", the website will send a large number of fetching requests at once which overloads the API server and leads to the website being IP banned.
(Incomplete)

### Built with

- [React](https://reactjs.org/) - JS library
- [NextJS](https://nextjs.org/) - React Framework
- [Material UI](https://mui.com/) - React UI Tools
- Flexbox and Grid

### Highlights
(Incomplete)

## Author

- GitHub - [Bao Dang](https://github.com/weebao)
