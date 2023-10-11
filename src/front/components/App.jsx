import { Component } from 'react';
import SearchBar from './SearchBar';
import Board from './Board';

class App extends Component {
  render() {
    return (
      <div className="app">
        <SearchBar />
        <Board />
      </div>
    );
  }
}

export default App;
