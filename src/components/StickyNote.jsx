function StickyNote({ noteText, onNoteChange }) {
    return (
      <section className="sticky-note">
        <p className="note-hint">
          One exercise per line: name, sets, reps, weight, notes (optional)
        </p>
        <textarea
          aria-label="Workout note"
          value={noteText}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder={'bench press, 3, 10, 135, felt heavy\nsquats, 4, 8, 185'}
          rows={8}
        />
      </section>
    );
  }
  
  export default StickyNote;