/* eslint-disable no-unused-vars */

// const { startCase, toUpper } = require('lodash');
// const { replaceSpacesWith } = require('./input');
// const { stateAbbreviations } = require('./states');
import { startCase, toUpper } from 'lodash';
import { replaceSpacesWith } from './input';
import { stateAbbreviations } from './states';

export default input => {
  if (!input) {
    console.error('NO INPUT');
    return null;
  }

  const obj = {};

  const city = input[0];
  const state = input[1];
  const stateAbbr = state;
  const stateLong = stateAbbreviations[stateAbbr];

  const cityLowerCase = city;
  const cityProperCase = startCase(city);
  const cityWithUnderscores = replaceSpacesWith(city, '_');
  const cityWithDashes = replaceSpacesWith(city, '-');
  const cityWithPluses = replaceSpacesWith(city, '+');

  const stateAbbrLowerCase = stateAbbr;
  const stateAbbrUpperCase = toUpper(stateAbbr);

  const stateLongLowerCase = stateLong;
  const stateLongProperCase = startCase(stateLong);
  const stateLongWithUnderscores = replaceSpacesWith(stateLong, '_');
  const stateLongWithDashes = replaceSpacesWith(stateLong, '-');
  const stateLongWithPluses = replaceSpacesWith(stateLong, '+');

  obj.cityProper = startCase(city);
  obj.stateAbbr = stateAbbr;
  obj.stateProper = startCase(stateLong);
  obj.properQuery = `${cityProperCase}, ${stateLongProperCase}`;
  obj.basicQuery = `${cityProperCase}, ${stateAbbr}`;
  obj.areaVibesQuery = `${cityWithPluses}-${stateAbbrLowerCase}`;
  obj.bestPlacesQuery = `${stateLongWithUnderscores}/${cityWithUnderscores}`;

  return obj;
};
