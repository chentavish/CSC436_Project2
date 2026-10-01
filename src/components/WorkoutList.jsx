import WorkoutItem from './WorkoutItem';

function WorkoutList({ workouts }) {
  if (workouts.length === 0) {
    return <p className="empty">No workouts yet. Add one above to get started.</p>;
  }

  return (
    <ul className="workout-list">
      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}
    </ul>
  );
}

export default WorkoutList;