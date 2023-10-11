// const toUpper = require('lodash/toUpper');
// const flow = require('lodash/flow');
import toUpper from 'lodash/toUpper';
import flow from 'lodash/flow';

// const { stateAbbreviations, stateNames, stateModifiers } = require('./states');
import { stateAbbreviations, stateNames, stateModifiers } from './states';

export const stripData = data => data.replace(/[^a-zA-Z0-9 @#%,.<>/]/gi, '').trim();

export const properCase = str => {
  return str
    .split(' ')
    .map(word =>
      word
        .toLowerCase()
        .split('')
        .map((char, i) => (i === 0 ? char.toUpperCase() : char))
        .join('')
    )
    .join(' ');
};

export const findAllIndexesOf = (str, target) => {
  return str
    .split('')
    .map((char, i) => (char === target ? i : null))
    .filter(el => el);
};

export const replaceSpacesWith = (str, replacement = '') => {
  if (!str.includes(' ')) return str;
  return str.replace(/ /g, replacement);
};

export const stripInput = input => {
  if (!input) return null;
  const str = input
    .replace(/ +/g, ' ')
    .replace(/[^a-zA-Z,. ]/g, '')
    .trim()
    .toLowerCase();
  return str;
};

export const findSplitIndex = input => {
  const commaIndex = input.lastIndexOf(',');

  if (commaIndex === 0 || commaIndex === input.length - 1) return null;
  if (commaIndex !== -1) return commaIndex;

  const spaceIndexes = findAllIndexesOf(input, ' ');

  const numberOfSpaces = spaceIndexes.length;
  if (numberOfSpaces === 0) return null;

  if (numberOfSpaces === 1) return spaceIndexes[0];

  if (numberOfSpaces >= 2) {
    const lastSpaceIndex = spaceIndexes[numberOfSpaces - 1];
    const secondTolastSpaceIndex = spaceIndexes[numberOfSpaces - 2];
    const secondToLastWord = input.slice(secondTolastSpaceIndex, lastSpaceIndex).trim();
    if (stateModifiers.includes(secondToLastWord)) return secondTolastSpaceIndex;
    return lastSpaceIndex;
  }
};

export const splitCityState = str => {
  if (!str) return null;
  const splitIndex = findSplitIndex(str);
  if (!splitIndex) return null;
  const city = str.slice(0, splitIndex).trim();
  if (city.length < 3) return null;
  const state = str.slice(splitIndex + 1).trim();
  return [city, state];
};

export const abbreviateState = arr => {
  if (!arr) return null;
  const city = arr[0];
  const state = arr[1];
  const stateAbbr = stateNames[state] || stateNames[stateAbbreviations[state]];
  if (!stateAbbr) return null;
  return [city, stateAbbr];
};

export const displayPlace = arr => {
  if (!arr) return null;
  return `${properCase(arr[0])}, ${toUpper(arr[1])}`;
};

export const makePlaceArr = flow(stripInput, splitCityState, abbreviateState);

export const makeQueryStr = flow(stripInput, splitCityState, abbreviateState, displayPlace);
