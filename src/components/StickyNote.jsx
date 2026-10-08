import { useRef, useState } from 'react';
import { suggestExercises } from '../utils/exercises';

// The exercise name is whatever's typed on the current line before the first comma.
function getTypedName(text, cursor) {
  const lineStart = text.lastIndexOf('\n', cursor - 1) + 1;
  const typed = text.slice(lineStart, cursor);
  if (typed.includes(',')) return null;
  return { lineStart, typed };
}

function StickyNote({ noteText, onNoteChange, onSave, exerciseNames }) {
  const textareaRef = useRef(null);
  const [cursor, setCursor] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const typedName = getTypedName(noteText, cursor);
  const suggestions = isFocused && typedName ? suggestExercises(typedName.typed, exerciseNames) : [];

  function acceptSuggestion(name) {
    const insert = `${name}, `;
    const nextText = noteText.slice(0, typedName.lineStart) + insert + noteText.slice(cursor);
    const nextCursor = typedName.lineStart + insert.length;
    onNoteChange(nextText);
    setCursor(nextCursor);
    requestAnimationFrame(() => {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(nextCursor, nextCursor);
    });
  }

  function handleKeyDown(e) {
    if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      acceptSuggestion(suggestions[0]);
    }
  }

  return (
    <section className="sticky-note">
      <p className="note-hint">
        One exercise per line: name, sets, reps, weight, notes (optional)
      </p>
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
      {suggestions.length > 0 && (
        <div className="suggestions" aria-label="Exercise suggestions">
          {suggestions.map((name, index) => (
            <button
              key={name}
              type="button"
              className={index === 0 ? 'suggestion first' : 'suggestion'}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => acceptSuggestion(name)}
            >
              {name}
            </button>
          ))}
          <span className="suggestion-hint">Tab to fill</span>
        </div>
      )}
      <button className="save-note" onClick={onSave}>
        Log workout
      </button>
    </section>
  );
}

export default StickyNote;
