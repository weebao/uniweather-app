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
![](./src/images/light_mode.jpg)

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
- Then I began creating a button for toggle light/dark mode using `useState`. I also  
- The rest is to design the layout for the tile that displays weather data for each university, which was the most challenging part because I kept wanting to add more features and the website became laggy.
- 

### Challenges
- My first challenge is seeing the limits of useState. After messing around with useState, I realized it will not work well since there are a lot of elements to consider and manage in a state. This was when I first learned about useReducer and also a bit of Redux, which helped me organize my React app a lot better since I can manage different cases and elements independently in one state.
- My second challenges comes with one of the features I wanted to add in, where the bill form will format the input amount when it is out of focus. I came across the Intl.NumberFormat function of JavaScript which worked wonders.
- My third challenge, which took me the longest time to work on, was the error indicator for the bill and people form. I wanted to have it show specifically how the input is invalid as in whether it is zero or negative. One problem occurred to me that I cannot seem to change the border color directly in JavaScript, which I struggled for a while until I realized a simple solution is just to add an error class and format it in SCSS.

### Built with

- [React](https://reactjs.org/) - JS library
- SCSS
- Flexbox and Grid

### Code Highlights

This is one of the coolest features I added, which is that the tip percent button will light up if the input in custom field coordinates with one of the percent listed. It is quite simple to make but I personally think it is pretty cool.

```html
<div>
      <div className="label">Select Tip %</div>
      <div className="tip-percent" onChange={handleTip} >
        <input id="tip5" type="radio" checked={tip == 5} name="5" value="5" />
        <label for="tip5">5%</label>
        <input id="tip10" type="radio" checked={tip == 10} name="10" value="10" />
        <label for="tip10">10%</label>
        <input id="tip15" type="radio" checked={tip == 15} name="15" value="15" />
        <label for="tip15">15%</label>
        <input id="tip25" type="radio" checked={tip == 25} name="25" value="25" />
        <label for="tip25">25%</label>
        <input id="tip50" type="radio" checked={tip == 50} name="50" value="50" />
        <label for="tip50">50%</label>
        <span>
          <input type="number" className="input-form hide-spin" name="custom-tip" placeholder="Custom" ref={inputRef}/>
        </span>
      </div>
    </div>
```

## Author

- Website - [Bao Dang](https://github.com/weebao)
- Frontend Mentor - [@Bao Dang](https://www.frontendmentor.io/profile/weebao)
