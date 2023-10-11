/* eslint-disable no-unreachable, no-unused-expressions  */
// const { START_KEY, END_KEY } = require('../constants/misc');
import { START_KEY, END_KEY } from '../constants/misc';

const findStartIndex = (code, term, mod) => {
  const modifiedTerm = `${mod}${term.toUpperCase()}${mod}`;
  const index = code.indexOf(modifiedTerm);
  return index === -1 ? 0 : index;
};

const findEndIndex = (code, term, mod) => {
  const modifiedTerm = `${mod}${term}${mod}`;
  const index = code.indexOf(modifiedTerm);
  return index === -1 ? undefined : index;
};

const narrowDownBySection = (code, sectionName) => {
  if (!sectionName) return code;
  const startIndex = findStartIndex(code, sectionName, START_KEY);
  const endIndex = findEndIndex(code, sectionName, END_KEY);
  const section = code.slice(startIndex, endIndex);
  return section;
};

const cutSnippet = (section, target, targetIndex, start = 0, end = 0) => {
  // start = 0 and end = 0 would select the target
  const index1 = targetIndex + start;
  const index2 = targetIndex + target.length + end;

  return section.slice(index1, index2);
};

const findTargetIndex = (code, target) => code.indexOf(target);

const findNums = code => {
  const re = /[(\d+,\d+)+(\d+.\d+)+]+/g;
  const nums = code.match(re);
  return nums ? nums[0] : null;
};

const scraper = (code, sectionName, target = '', start = 0, end = 10, show = 0) => {
  if (!code) return '';
  const section = narrowDownBySection(code, sectionName);
  if (!section.length) return 'SECTION NOT FOUND';

  const targetIndex = findTargetIndex(section, target);
  const snippet = cutSnippet(section, target, targetIndex, start, end);
  const nums = findNums(snippet);

  const optionsObj = {
    nums,
    targetIndex,
    snippet,
    sectionSlice: section.slice(0, 20),
    code,
  };

  const optionsArr = Object.values(optionsObj);

  return optionsArr[show];
};

export default scraper;
