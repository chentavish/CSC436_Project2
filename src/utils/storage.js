const STORAGE_KEY = 'workout-tracker.workouts';

export function loadWorkouts(fallback) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function saveWorkouts(workouts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
  } catch {
  }
}
