import { useEffect, useState } from 'react';
import Header from './components/Header';
import TabBar from './components/TabBar';
import StickyNote from './components/StickyNote';
import Calendar from './components/Calendar';
import { parseNote } from './utils/parseNote';
import { toDateKey } from './utils/dates';
import { getExerciseNames } from './utils/exercises';
import { loadWorkouts, saveWorkouts } from './utils/storage';
import './App.css';

const STARTER_WORKOUTS = [
  { id: 1, date: '2026-10-01', name: 'Pull-ups', sets: 3, reps: 8, weight: 0, notes: '' },
  {
    id: 2,
    date: '2026-10-05',
    name: 'Bench press',
    sets: 3,
    reps: 10,
    weight: 135,
    notes: 'felt heavy',
  },
  { id: 3, date: '2026-10-05', name: 'Squats', sets: 4, reps: 8, weight: 185, notes: '' },
];

function App() {
  const [workouts, setWorkouts] = useState(() => loadWorkouts(STARTER_WORKOUTS));
  const [activeTab, setActiveTab] = useState('note');
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    saveWorkouts(workouts);
  }, [workouts]);

  function handleSaveNote() {
    const newWorkouts = parseNote(noteText, toDateKey(new Date()), getExerciseNames(workouts));
    if (newWorkouts.length === 0) return;
    setWorkouts((current) => [...current, ...newWorkouts]);
    setNoteText('');
    setActiveTab('calendar');
  }

  function handleDeleteWorkout(id) {
    setWorkouts((current) => current.filter((workout) => workout.id !== id));
  }

  return (
    <div className="app">
      <Header />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {activeTab === 'note' && (
          <StickyNote
            noteText={noteText}
            onNoteChange={setNoteText}
            onSave={handleSaveNote}
            workouts={workouts}
          />
        )}
        {activeTab === 'calendar' && (
          <Calendar workouts={workouts} onDeleteWorkout={handleDeleteWorkout} />
        )}
      </main>
    </div>
  );
}

export default App;
