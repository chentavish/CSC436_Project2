function WorkoutItem({ workout, onDelete }) {
    return (
      <li className="workout-item">
        <span className="workout-name">{workout.name}</span>
        <span className="workout-detail">
          {workout.sets} × {workout.reps}
        </span>
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
