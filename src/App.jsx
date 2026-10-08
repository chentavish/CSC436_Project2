import { useState } from 'react';
import Header from './components/Header';
import TabBar from './components/TabBar';
import StickyNote from './components/StickyNote';
import Calendar from './components/Calendar';
import './App.css';

const STARTER_WORKOUTS = [
  { id: 1, date: '2026-10-01', name: 'Pull-ups', sets: 3, reps: 8, weight: 0, notes: '' },
  { id: 2, date: '2026-10-05', name: 'Bench press', sets: 3, reps: 10, weight: 135, notes: 'felt heavy' },
  { id: 3, date: '2026-10-05', name: 'Squats', sets: 4, reps: 8, weight: 185, notes: '' },
];

function App() {
  const [workouts, setWorkouts] = useState(STARTER_WORKOUTS);
  const [activeTab, setActiveTab] = useState('note');
  const [noteText, setNoteText] = useState('');

  return (
    <div className="app">
      <Header />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {activeTab === 'note' && (
          <StickyNote noteText={noteText} onNoteChange={setNoteText} />
        )}
        {activeTab === 'calendar' && <Calendar workouts={workouts} />}
        {activeTab === 'stats' && <p>Stats go here.</p>}
      </main>
    </div>
  );
}

export default App;