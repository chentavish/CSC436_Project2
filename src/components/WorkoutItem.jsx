function WorkoutItem({ workout }) {
    return (
      <li className="workout-item">
        <span className="workout-name">{workout.name}</span>
        <span className="workout-detail">
          {workout.sets} × {workout.reps}
        </span>
      </li>
    );
  }
  
  export default WorkoutItem;