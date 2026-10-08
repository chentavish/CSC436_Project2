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

function suggestExercises(typed, names) {
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

export function formatSets(workout) {
  const sets = `${workout.sets} × ${workout.reps}`;
  return workout.weight > 0 ? `${sets} @ ${workout.weight} lb` : sets;
}

const FIELDS = ['name', 'sets', 'reps', 'weight', 'notes'];
const FIELD_LABELS = ['Exercise', 'Sets', 'Reps', 'Weight', 'Notes'];
const DEFAULT_VALUES = { sets: ['3', '4', '5'], reps: ['8', '10', '12'], weight: [], notes: [] };

// Suggestions for whichever field the cursor is in, based on the line typed so far.
// Each option is { label, value, addComma }; value replaces what's typed in that field.
export function getNoteSuggestions(lineSoFar, workouts) {
  const parts = lineSoFar.split(',');
  const fieldIndex = Math.min(parts.length - 1, FIELDS.length - 1);
  const field = FIELDS[fieldIndex];
  const label = FIELD_LABELS[fieldIndex];
  const typed = parts[parts.length - 1].trim().toLowerCase();

  if (field === 'name') {
    const options = suggestExercises(typed, getExerciseNames(workouts)).map((name) => ({
      label: name,
      value: name,
      addComma: true,
    }));
    return { label, options };
  }

  const exercise = parts[0].trim().toLowerCase();
  const history = workouts
    .filter((workout) => workout.name.toLowerCase() === exercise)
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

  const options = [];
  if (field === 'sets' && typed === '' && history.length > 0) {
    const last = history[0];
    options.push({
      label: `Last time: ${formatSets(last)}`,
      value: `${last.sets}, ${last.reps}, ${last.weight}`,
      addComma: false,
    });
  }

  const seen = new Set();
  for (const value of [
    ...history.map((workout) => String(workout[field])),
    ...DEFAULT_VALUES[field],
  ]) {
    const key = value.toLowerCase();
    if (value === '' || seen.has(key) || !key.startsWith(typed) || key === typed) continue;
    seen.add(key);
    options.push({ label: value, value, addComma: field === 'sets' || field === 'reps' });
  }

  return { label, options: options.slice(0, 4) };
}
