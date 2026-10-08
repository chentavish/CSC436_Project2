import { useState } from 'react';
import CalendarDay from './CalendarDay';
import WorkoutList from './WorkoutList';
import { toDateKey, formatDateKey } from '../utils/dates';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar({ workouts }) {
  const today = new Date();
  const todayKey = toDateKey(today);
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(todayKey);

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const dayKeys = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dayKeys.push(toDateKey(new Date(year, month, day)));
  }

  const selectedWorkouts = workouts.filter((workout) => workout.date === selectedDate);

  function changeMonth(offset) {
    setViewMonth(new Date(year, month + offset, 1));
  }

  return (
    <section className="calendar">
      <div className="calendar-header">
        <button className="month-button" onClick={() => changeMonth(-1)} aria-label="Previous month">
          ‹
        </button>
        <h2>{viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
        <button className="month-button" onClick={() => changeMonth(1)} aria-label="Next month">
          ›
        </button>
      </div>

      <div className="calendar-grid">
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className="weekday">{weekday}</div>
        ))}
        {dayKeys.map((dateKey, index) => (
          <CalendarDay
            key={dateKey}
            dayNumber={index + 1}
            startColumn={index === 0 ? firstWeekday + 1 : undefined}
            hasWorkout={workouts.some((workout) => workout.date === dateKey)}
            isSelected={dateKey === selectedDate}
            isToday={dateKey === todayKey}
            onSelect={() => setSelectedDate(dateKey)}
          />
        ))}
      </div>

      <h3 className="selected-day">{formatDateKey(selectedDate)}</h3>
      <WorkoutList workouts={selectedWorkouts} />
    </section>
  );
}

export default Calendar;