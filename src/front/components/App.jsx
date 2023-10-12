import { Component } from 'react';
import { isBrowser } from 'react-device-detect';
import SearchBar from './SearchBar';
import Board from './Board';

export default class App extends Component {
  render() {
    return (
      <div className="page flex justify-center" style={{ paddingTop: isBrowser ? 50 : 0 }}>
        <div
          className="app br3 flex flex-column items-center"
          style={{ width: isBrowser ? 400 : '100vw', height: isBrowser ? '90vh' : '100vh' }}
        >
          <SearchBar />
          <Board />
        </div>
      </div>
    );
  }
}
