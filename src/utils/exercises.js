const COMMON_EXERCISES = [
  'Bench press',
  'Bicep curls',
  'Deadlift',
  'Dips',
  'Incline bench press',
  'Lat pulldown',
  'Leg press',
  'Lunges',
  'Overhead press',
  'Plank',
  'Pull-ups',
  'Push-ups',
  'Romanian deadlift',
  'Seated row',
  'Squats',
  'Tricep pushdown',
];

export function getExerciseNames(workouts) {
  const names = [];
  const seen = new Set();
  for (const name of [...workouts.map((workout) => workout.name), ...COMMON_EXERCISES]) {
    const key = name.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      names.push(name);
    }
  }
  return names;
}

export function suggestExercises(typed, names) {
  const query = typed.trim().toLowerCase();
  if (query === '') return [];
  return names
    .filter((name) => name.toLowerCase().startsWith(query) && name.toLowerCase() !== query)
    .slice(0, 4);
}

export function normalizeExerciseName(name, names) {
  const cleaned = name.trim().replace(/\s+/g, ' ');
  const match = names.find((known) => known.toLowerCase() === cleaned.toLowerCase());
  if (match) return match;
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
