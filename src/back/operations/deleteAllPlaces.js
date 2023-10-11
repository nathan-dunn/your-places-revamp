// const PlaceModel = require('../models/placeModel');
import PlaceModel from '../models/placeModel';

const { MODE } = import.meta.env;

export default async (req, res) => {
  if (MODE !== 'development')
    return res.status(200).json({ message: 'Only allowed for developement!' });

  PlaceModel.remove({}, async (err, entries) => {
    if (err) return res.json(err);
    return res.status(200).json({ message: 'All places removed!' });
  });
};
