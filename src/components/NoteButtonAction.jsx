import React from 'react';

function NoteButtonAction({
  variant,
  onClick,
  children,
}) {
  const testId =
    variant === 'delete'
      ? 'note-item-delete-button'
      : 'note-item-archive-button';

  return (
    <button
      type="button"
      className={`note-item__${variant}-button`}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </button>
  );
}

export default NoteButtonAction;