import React from 'react';
import { showFormattedDate } from '../utils';
import NoteButtonAction from './NoteButtonAction';

function textHighlight(text, keyword) {
  if (!keyword || keyword.trim() === '') {
    return text;
  }

  const keywordEscaped = keyword.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );

  const regex = new RegExp(
    `(${keywordEscaped})`,
    'gi'
  );

  return text.split(regex).map((part, index) => {
    if (
      part.toLowerCase() === keyword.toLowerCase()
    ) {
      return (
        <mark key={index}>
          {part}
        </mark>
      );
    }

    return part;
  });
}

function NoteItem({
  note,
  onDelete,
  onArchive,
  searchKeyword = '',
}) {
  return (
    <div
      className="note-item"
      data-testid="note-item"
      data-note-id={note.id}
    >
      <div
        className="note-item__content"
        data-testid="note-item-content"
      >
        <h3
          className="note-item__title"
          data-testid="note-item-title"
        >
          {textHighlight(
            note.title,
            searchKeyword
          )}
        </h3>

        <p
          className="note-item__date"
          data-testid="note-item-date"
        >
          {showFormattedDate(note.createdAt)}
        </p>

        <p
          className="note-item__body"
          data-testid="note-item-body"
        >
          {textHighlight(
            note.body,
            searchKeyword
          )}
        </p>
      </div>

      <div
        className="note-item__action"
        data-testid="note-item-action"
      >
        <NoteButtonAction
          variant="delete"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </NoteButtonAction>

        <NoteButtonAction
          variant="archive"
          onClick={() => onArchive(note.id)}
        >
          {note.archived
            ? 'Pindahkan'
            : 'Arsipkan'}
        </NoteButtonAction>
      </div>
    </div>
  );
}

export default NoteItem;