import makeQueryObj from './makeQueryObj';
import { makePlaceArr } from '../utils/input';
import scraper from './scraper';
import { HEADER, DELETION } from '../constants/misc';

const makeDataObj = entry => {
  const { _id, place, html } = entry;

  const queryObj = makeQueryObj(makePlaceArr(place));

  let obj = {};
  obj.stash = { queryObj, place, id: _id };

  obj.GENERAL = HEADER;
  obj['State'] = queryObj.stateProper;
  obj['Population'] = scraper(html, 'demographics', 'has a population of', 0, 10);
  obj['Population Density'] = scraper(html, 'demographics', 'The population density is', 0, 10);

  obj.CLIMATE = HEADER;
  obj['Rainfall'] = scraper(html, 'climate', '<u>Rainfall (in.', 20, 25);
  obj['Snowfall'] = scraper(html, 'climate', '<u>Snowfall (in.', 20, 25);
  obj['Rainy Days'] = scraper(html, 'climate', '<u>Precipitation Days', 15, 25);
  obj['Sunny Days'] = scraper(html, 'climate', '<u>Sunny Days', 15, 25);
  obj['Avg July High'] = scraper(html, 'climate', '<u>Avg. July High', 15, 25);
  obj['Avg Jan Low'] = scraper(html, 'climate', '<u>Avg. Jan. Low', 15, 25);
  obj['Comfort Index'] = scraper(html, 'climate', '<u>Comfort Index', 40, 40);
  obj['UV Index'] = scraper(html, 'climate', '<u>UV Index', 15, 25);
  obj['Elevation'] = scraper(html, 'climate', 'Elevation ft.', 15, 25);

  obj.PEOPLE = HEADER;
  obj['Median Age'] = scraper(html, 'demographics', '<td>Median age</td>', 0, 10);
  obj['Married'] = scraper(html, 'people', 'are married', -8, 0);
  obj['Divorced'] = scraper(html, 'people', 'are divorced', -10, 0);
  obj['Married With Children'] = scraper(html, 'people', 'are married with children', -10, 5);
  obj['Single With Children'] = scraper(html, 'people', 'have children, but are single', -10, 5);
  obj['White'] = scraper(html, 'people', 'are white', -10, 5);
  obj['Black'] = scraper(html, 'people', 'are black', -10, 5);
  obj['Hispanic'] = scraper(html, 'people', 'claim Hispanic', -10, 5);
  obj['Asian'] = scraper(html, 'people', 'are asian', -10, 5);

  obj.CRIME = HEADER;
  obj['Violent Crime'] = scraper(html, 'crime', 'violent crime is', 0, 15);
  obj['Property Crime'] = scraper(html, 'crime', 'property crime is', 0, 15);

  obj.ECONOMY = HEADER;
  obj['Income Per Capita'] = scraper(html, 'jobs', '<u>Income per Cap.', 20, 30);
  obj['Household Income'] = scraper(html, 'jobs', '<u>Household Income', 20, 30);
  obj['Unemployment Rate'] = scraper(html, 'jobs', '<u>Unemployment Rate', 20, 30);
  obj['Recent Job Growth'] = scraper(html, 'jobs', '<u>Recent Job Growth', 20, 30);
  obj['Future Job Growth'] = scraper(html, 'jobs', '<u>Future Job Growth', 20, 30);
  obj[''] = DELETION;

  return obj;
};

export default makeDataObj;
