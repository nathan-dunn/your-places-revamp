// const router = require('express').Router();
// const getAllPlaces = require('../operations/getAllPlaces');
// const getPlace = require('../operations/getPlace');
// const deleteAllPlaces = require('../operations/deleteAllPlaces');
// const countPlaces = require('../operations/countPlaces');
// const getHtml = require('../operations/getHtml');

import app from 'express';
import getAllPlaces from '../operations/getAllPlaces';
import getPlace from '../operations/getPlace';
import deleteAllPlaces from '../operations/deleteAllPlaces';
import countPlaces from '../operations/countPlaces';
import getHtml from '../operations/getHtml';

const router = app.Router();

router.route('/places').get(getAllPlaces).delete(deleteAllPlaces);

router.route('/count').get(countPlaces);

router.route('/search/:input').get(getPlace);
router.route('/html/:input').get(getHtml);

export default router;
