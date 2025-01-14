'use client';
import CloseButton from '../close-button/close-button';
import Input from '../input/input';
import './word-editor.scss';

function WordEditor({ wordData, onChange, onRemove }) {
  return (
    <div className="word-editor">
      <CloseButton className="word-editor__remove" onClick={onRemove} />
      <label className="word-editor__label">
        Введите слово на английском
        <Input
          type="text"
          onChange={(e) => onChange({ type: 'english', word: e.target.value })}
          value={wordData.english}
          required={true}
        />
      </label>
      <label className="word-editor__label">
        Введите перевод
        <Input
          type="text"
          onChange={(e) => onChange({ type: 'russian', word: e.target.value })}
          value={wordData.russian}
          required={true}
        />
      </label>
      <label className="word-editor__label">
        Введите пример на английском
        <Input
          type="text"
          onChange={(e) => onChange({ type: 'example', word: e.target.value })}
          value={wordData.example || ''}
          required={!!wordData.exampleTranslation}
        />
      </label>
      <label className="word-editor__label">
        Введите перевод примера
        <Input
          type="text"
          onChange={(e) => onChange({ type: 'exampleTranslation', word: e.target.value })}
          value={wordData.exampleTranslation || ''}
          required={!!wordData.example}
        />
      </label>
    </div>
  );
}

export default WordEditor;
