import axios from 'axios';
import { austin } from '../../../dummy/austin';
import * as types from '../../constants/actionTypes';
import makeDataObj from '../../utils/makeDataObj';
import { addPlaceToStorage, getPlacesFromStorage } from '../../utils/storage';

const { API_URL } = import.meta.env;

export const searchPlace = queryStr => {
  // FOR DEMO PURPOSES

  if (queryStr.toUpperCase().replace(/[^a-zA-Z0-9 ]/g, '') === 'AUSTIN TX') {
    return async dispatch => {
      dispatch({ type: types.SEARCH_START, payload: queryStr });
      setTimeout(() => {
        try {
          // let state know we started a search and have state hold the query

          const response = { data: { _id: '123', place: 'Austin, TX', html: austin } };

          // code scrape and make a data object
          const place = makeDataObj(response.data);

          // add it to local storage stack (mind the logic)
          addPlaceToStorage(place);

          // get the storage stack
          const places = getPlacesFromStorage();

          // update state with the storage stack and tell state we are done searching
          dispatch({ type: types.SEARCH_RETURN, payload: places });
        } catch (err) {
          console.error('ERROR IN searchPlace', err);
          dispatch({
            type: types.SEARCH_ERROR,
            payload: null,
          });
        }
      }, 1000);
    };
  }

  return async dispatch => {
    try {
      // let state know we started a search and have state hold the query
      dispatch({ type: types.SEARCH_START, payload: queryStr });

      // make the request to the api
      const url = `${API_URL}/search/${queryStr}`;
      const response = await axios.get(url);

      // code scrape and make a data object
      const place = makeDataObj(response.data);

      // add it to local storage stack (mind the logic)
      addPlaceToStorage(place);

      // get the storage stack
      const places = getPlacesFromStorage();

      // update state with the storage stack and tell state we are done searching
      dispatch({ type: types.SEARCH_RETURN, payload: places });
    } catch (err) {
      console.error('ERROR IN searchPlace', err);
      dispatch({
        type: types.SEARCH_ERROR,
        payload: null,
      });
    }
  };
};

export const getStackFromStorage = () => {
  const places = getPlacesFromStorage() || [];
  return { type: types.GET_LATEST, payload: places };
};
