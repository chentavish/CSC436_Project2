# Workout Tracker

A React app for logging workouts the way you'd jot them on a sticky note. Type one exercise per line, hit Log workout, and that day lights up on the calendar.

**Live site:** https://csc436project2.netlify.app/

## Features

- **Sticky note entry:** one exercise per line in the format `name, sets, reps, weight, notes`. Weight and notes are optional.
- **Autofill:** suggests exercise names and values from your past workouts as you type. Press Tab or click a suggestion to fill it in.
- **Calendar:** days with logged workouts turn yellow. Click a day to see what you did, and hover over a workout to delete it.
- **Saves automatically:** workouts are stored in your browser, so they're still there after a refresh.

Example note:

```
bench press, 3, 10, 135, felt heavy
push-ups, 3, 15
```

## Run it locally

You'll need Node.js installed.

```bash
git clone https://github.com/chentavish/CSC436_Project2
cd CSC436_Project2
npm install
npm run dev
```

Then open http://localhost:5173.

## Built with

React and Vite, deployed on Netlify.