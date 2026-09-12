import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      error: '',
    };

    this.onTitleChangeEventHandler =
      this.onTitleChangeEventHandler.bind(this);

    this.onBodyChangeEventHandler =
      this.onBodyChangeEventHandler.bind(this);

    this.onSubmitEventHandler =
      this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const title = event.target.value;

    if (title.length <= 50) {
      this.setState({
        title,
      });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState({
      body: event.target.value,
      error: '',
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;

    if (body.length < 10) {
      this.setState({
        error: 'Isi catatan minimal harus 10 karakter',
      });

      return;
    }

    this.props.addNote({
      title,
      body,
    });

    this.setState({
      title: '',
      body: '',
      error: '',
    });
  }

  render() {
    const { title, body, error } = this.state;

    const remainingChars = 50 - title.length;

    return (
      <div
        className="note-input"
        data-testid="note-input"
      >
        <h2>Buat catatan</h2>

        {error && (
          <p className="note-input__feedback--error">
            {error}
          </p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          <p
            className="note-input__title__char-limit"
            data-testid="note-input-title-remaining"
          >
            {remainingChars} karakter tersisa
          </p>

          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />

          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />

          <button
            type="submit"
            data-testid="note-input-submit-button"
          >
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;