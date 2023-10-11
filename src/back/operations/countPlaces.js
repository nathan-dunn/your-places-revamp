import PlaceModel from '../models/placeModel';

export default async (req, res) => {
  PlaceModel.find({}, async (err, entries) => {
    if (err) return res.json(err);
    return res.status(200).json(entries.length);
  });
};
