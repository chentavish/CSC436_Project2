import { formatSets } from '../utils/exercises';

function WorkoutItem({ workout, onDelete }) {
  return (
    <li className="workout-item">
      <div className="workout-main">
        <span className="workout-name">{workout.name}</span>
        {workout.notes && <span className="workout-notes">{workout.notes}</span>}
      </div>
      <span className="workout-detail">{formatSets(workout)}</span>
      <button
        className="delete-workout"
        onClick={() => onDelete(workout.id)}
        aria-label={`Delete ${workout.name}`}
      >
        ×
      </button>
    </li>
  );
}

export default WorkoutItem;
