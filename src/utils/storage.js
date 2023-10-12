import uniqBy from 'lodash/uniqBy';

export const getPlacesFromStorage = () => JSON.parse(sessionStorage.getItem('places'));

export const addPlaceToStorage = placeObj => {
  let places = getPlacesFromStorage();
  places = !places
    ? [placeObj]
    : uniqBy([placeObj, ...places], placeObj => placeObj.stash.id).slice(0, 5);
  sessionStorage.setItem('places', JSON.stringify(places));
};

export const removePlaceFromStorage = id => {
  const places = getPlacesFromStorage();
  const updatedPlaces = places.filter(place => place.stash.id !== id);
  sessionStorage.setItem('places', JSON.stringify(updatedPlaces));
};
