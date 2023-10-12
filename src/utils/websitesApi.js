import axios from 'axios';
import makeQueryObj from './makeQueryObj';
import { makePlaceArr } from './input';
import { AREA_VIBES_URL, BEST_PLACES_URL } from '../constants/websiteUrls';
import { START_KEY, END_KEY } from '../constants/misc';

const areaVibesPaths = [
  'livability',
  'demographics',
  'amenities',
  'cost-of-living',
  'crime',
  'education',
  'employment',
  'housing',
  'weather',
];

const bestPlacesPaths = [
  'overview',
  'cost_of_living',
  'jobs',
  'crime',
  'climate',
  'schools',
  'education',
  'economy',
  'health',
  'religion',
  'people',
  'voting',
  'housing',
  'transportation',
  'rankings',
];

const makeAreaVibesUrl = (place, path) => `${AREA_VIBES_URL}/${place}/${path}`;

const makeBestPlacesUrl = (place, path) => {
  if (path === 'overview') return `${BEST_PLACES_URL}/city/${place}`;
  if (path === 'schools') return `${BEST_PLACES_URL}/${path}/${place}`;
  return `${BEST_PLACES_URL}/${path}/city/${place}`;
};

const fetch = async url => {
  const response = await axios.get(url);
  const err = response.data.indexOf('embarrassing') !== -1 ? '!!!' : '';
  console.info(url, err);
  return response.data;
};

const fetchAllPaths = async (urlSource, paths, place) => {
  const obj = {};
  await axios.all(
    paths.map(async path => {
      const url = urlSource(place, path);
      const response = await fetch(url);
      obj[path] = response;
      return response;
    })
  );
  return obj;
};

const joinProperties = arr =>
  arr.reduce((acc, obj) => {
    for (let key in obj) {
      acc += `${START_KEY}${key.toUpperCase()}${START_KEY}`;
      acc += obj[key];
      acc += `${END_KEY}${key.toUpperCase()}${END_KEY}`;
    }
    return acc;
  }, '');

export const fetchFromWebsites = async place => {
  const placeArr = makePlaceArr(place);
  const { areaVibesQuery, bestPlacesQuery } = makeQueryObj(placeArr);

  const responseArr = await axios.all([
    fetchAllPaths(makeAreaVibesUrl, areaVibesPaths, areaVibesQuery),
    fetchAllPaths(makeBestPlacesUrl, bestPlacesPaths, bestPlacesQuery),
  ]);

  return joinProperties(responseArr);
};
