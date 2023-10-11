import { combineReducers } from 'redux';
import * as types from '../../constants/actionTypes';

const places = (state = [], action) => {
  switch (action.type) {
    case types.SEARCH_ERROR:
      return action.payload;

    case types.SEARCH_START:
      return action.payload;

    case types.SEARCH_RETURN:
      return action.payload;

    case types.GET_LATEST:
      return action.payload;

    default:
      return state;
  }
};

const isSearching = (state = false, action) => {
  switch (action.type) {
    case types.SEARCH_START:
      return true;

    case types.SEARCH_RETURN:
      return false;

    case types.SEARCH_ERROR:
      return false;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  places,
  isSearching,
});

export default rootReducer;
