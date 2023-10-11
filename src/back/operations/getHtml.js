// const PlaceModel = require('../models/placeModel');
import PlaceModel from '../models/placeModel';

export default async (req, res) => {
  const { input: place } = req.params;

  PlaceModel.find({ place }, async (err, result) => {
    if (err) return res.send(err);
    const entry = result[0];

    if (!entry) return res.status(404).json({ message: `Sorry no html found for ${place.place}` });
    console.info(`HERE IS THE HTML FOR ${place}`);
    return res.status(200).json(entry.html);
  });
};
