function CalendarDay({ dayNumber, startColumn, hasWorkout, isSelected, isToday, onSelect }) {
  const classNames = ['calendar-day'];
  if (hasWorkout) classNames.push('has-workout');
  if (isToday) classNames.push('today');
  if (isSelected) classNames.push('selected');

  return (
    <button
      className={classNames.join(' ')}
      style={{ gridColumnStart: startColumn }}
      onClick={onSelect}
    >
      {dayNumber}
    </button>
  );
}

export default CalendarDay;
