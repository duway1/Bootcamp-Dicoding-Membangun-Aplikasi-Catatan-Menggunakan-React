import React from 'react';

class NoteSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: '',
    };

    this.onSearchChangeHandler =
      this.onSearchChangeHandler.bind(this);
  }

  onSearchChangeHandler(event) {
    const searchKeyword = event.target.value;

    this.setState({
      searchKeyword,
    });

    this.props.onSearch(searchKeyword);
  }

  render() {
    return (
      <div
        className="note-search"
        data-testid="note-search"
      >
        <input
          type="text"
          placeholder="Pencarian ...."
          value={this.state.searchKeyword}
          onChange={this.onSearchChangeHandler}
          data-testid="note-search-input"
        />
      </div>
    );
  }
}

export default NoteSearch;