import { Component } from 'react';
import { connect } from 'react-redux';

import Fresh from './Fresh';
import Searching from './Searching';
import NotFound from './NotFound';
import Primary from './Primary';
import * as actions from '../actions';
import { removePlaceFromStorage } from '../../utils/storage';

class Board extends Component {
  componentDidMount() {
    const { getStackFromStorage } = this.props;
    return getStackFromStorage();
  }

  handleDeleteClick = id => {
    const { getStackFromStorage } = this.props;
    removePlaceFromStorage(id);
    return getStackFromStorage();
  };

  render() {
    const { places, isSearching } = this.props;
    const havePlaces = Array.isArray(places) && places.length;
    const isFresh = Array.isArray(places) && places.length === 0;

    return (
      <div className="board w-90 center f7 pb1">
        {isFresh ? (
          <Fresh places={places} />
        ) : havePlaces ? (
          <Primary places={places} handleDeleteClick={this.handleDeleteClick} />
        ) : isSearching ? (
          <Searching places={places} />
        ) : (
          <NotFound places={places} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places,
  isSearching: state.isSearching,
});

const mapDispatchToProps = dispatch => ({
  getStackFromStorage: latest => dispatch(actions.getStackFromStorage(latest)),
});

const _Board = connect(mapStateToProps, mapDispatchToProps)(Board);
export default _Board;
