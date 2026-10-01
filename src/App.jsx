import { useState } from 'react';
import Header from './components/Header';
import TabBar from './components/TabBar';
import WorkoutList from './components/WorkoutList';
import './App.css';

const STARTER_WORKOUTS = [
  { id: 1, name: 'Push-ups', sets: 3, reps: 15, done: false },
  { id: 2, name: 'Squats', sets: 4, reps: 12, done: false },
  { id: 3, name: 'Lunges', sets: 3, reps: 10, done: true },
];

function App() {
  const [workouts, setWorkouts] = useState(STARTER_WORKOUTS);
  const [activeTab, setActiveTab] = useState('note');

  return (
    <div className="app">
      <Header />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {activeTab === 'note' && <p>Sticky note goes here.</p>}
        {activeTab === 'calendar' && <WorkoutList workouts={workouts} />}
        {activeTab === 'stats' && <p>Stats go here.</p>}
      </main>
    </div>
  );
}

export default App;