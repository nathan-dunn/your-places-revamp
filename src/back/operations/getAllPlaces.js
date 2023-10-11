import PlaceModel from '../models/placeModel';

export default async (req, res) => {
  PlaceModel.find({}, async (err, entries) => {
    if (err) return res.send(err);

    const places = entries.map(entry => {
      return { place: entry.place, createAt: entry.createAt };
    });
    return res.status(200).json(places);
  });
};
