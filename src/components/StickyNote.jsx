import { useRef, useState } from 'react';
import { getNoteSuggestions } from '../utils/exercises';

function StickyNote({ noteText, onNoteChange, onSave, workouts }) {
  const textareaRef = useRef(null);
  const [cursor, setCursor] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const lineStart = noteText.lastIndexOf('\n', cursor - 1) + 1;
  const lineSoFar = noteText.slice(lineStart, cursor);
  const fieldStart = lineStart + lineSoFar.lastIndexOf(',') + 1;
  const { label, options } = isFocused
    ? getNoteSuggestions(lineSoFar, workouts)
    : { label: '', options: [] };

  function acceptSuggestion(option) {
    const leadingSpace = fieldStart > lineStart ? ' ' : '';
    const insert = leadingSpace + option.value + (option.addComma ? ', ' : '');
    const nextText = noteText.slice(0, fieldStart) + insert + noteText.slice(cursor);
    const nextCursor = fieldStart + insert.length;
    onNoteChange(nextText);
    setCursor(nextCursor);
    requestAnimationFrame(() => {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(nextCursor, nextCursor);
    });
  }

  function handleKeyDown(e) {
    if (e.key === 'Tab' && options.length > 0) {
      e.preventDefault();
      acceptSuggestion(options[0]);
    }
  }

  return (
    <section className="sticky-note">
      <p className="note-hint">One exercise per line: name, sets, reps, weight, notes (optional)</p>
      <textarea
        ref={textareaRef}
        aria-label="Workout note"
        value={noteText}
        onChange={(e) => {
          onNoteChange(e.target.value);
          setCursor(e.target.selectionStart);
        }}
        onSelect={(e) => setCursor(e.target.selectionStart)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={'bench press, 3, 10, 135, felt heavy\nsquats, 4, 8, 185'}
        rows={8}
      />
      {options.length > 0 && (
        <div className="suggestions" aria-label={`${label} suggestions`}>
          {options.map((option, index) => (
            <button
              key={option.label}
              type="button"
              className={index === 0 ? 'suggestion first' : 'suggestion'}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => acceptSuggestion(option)}
            >
              {option.label}
            </button>
          ))}
          <span className="suggestion-hint">{label} · Tab to fill</span>
        </div>
      )}
      <button className="save-note" onClick={onSave}>
        Log workout
      </button>
    </section>
  );
}

export default StickyNote;
