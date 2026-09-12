import React from 'react';
import NoteItem from './NoteItem';

function NotesList({
  notes,
  onDelete,
  onArchive,
  dataTestId = 'notes-list',
  searchKeyword = '',
}) {
  const hasNotes =
    Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div
        className="notes-list"
        data-testid={dataTestId}
      >
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }

  const notesGroup = notes.reduce(
    (groups, note) => {
      const date = new Date(note.createdAt);

      const year = date.getFullYear();

      const month = String(
        date.getMonth() + 1
      ).padStart(2, '0');

      const groupKey = `${year}-${month}`;

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }

      groups[groupKey].push(note);

      return groups;
    },
    {}
  );

  const formatHeaderGroup = (groupKey) => {
    const [year, month] =
      groupKey.split('-');

    const date = new Date(
      Number(year),
      Number(month) - 1,
      1
    );

    return date.toLocaleDateString(
      'id-ID',
      {
        month: 'long',
        year: 'numeric',
      }
    );
  };

  return (
    <div
      className="notes-list"
      data-testid={dataTestId}
    >
      {Object.entries(notesGroup).map(
        ([groupKey, groupNotes]) => (
          <section
            key={groupKey}
            className="notes-group"
            data-testid={`${groupKey}-group`}
          >
            <h3>
              {formatHeaderGroup(groupKey)}
            </h3>

            <span
              data-testid={`${groupKey}-group-count`}
            >
              {groupNotes.length} catatan
            </span>

            {groupNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </section>
        )
      )}
    </div>
  );
}

export default NotesList;