import { normalizeExerciseName } from './exercises';

export function parseNote(text, dateKey, knownNames = []) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map((line, index) => {
      const [name, sets, reps, weight, ...notes] = line.split(',').map((part) => part.trim());
      return {
        id: Date.now() + index,
        date: dateKey,
        name: normalizeExerciseName(name, knownNames),
        sets: Number(sets) || 0,
        reps: Number(reps) || 0,
        weight: Number(weight) || 0,
        notes: notes.join(', '),
      };
    })
    .filter((workout) => workout.name);
}
