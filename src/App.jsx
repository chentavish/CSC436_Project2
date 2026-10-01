import { useState } from 'react';
import Header from './components/Header';
import WorkoutList from './components/WorkoutList';
import './App.css';

const STARTER_WORKOUTS = [
  { id: 1, name: 'Push-ups', sets: 3, reps: 15, done: false },
  { id: 2, name: 'Squats', sets: 4, reps: 12, done: false },
  { id: 3, name: 'Lunges', sets: 3, reps: 10, done: true },
];

function App() {
  const [workouts, setWorkouts] = useState(STARTER_WORKOUTS);

  return (
    <div className="app">
      <Header />
      <main>
        <WorkoutList workouts={workouts} />
      </main>
    </div>
  );
}

export default App;