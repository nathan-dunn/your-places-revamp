// const { fetchFromWebsites } = require('../../utils/websitesApi');
// const PlaceModel = require('../models/placeModel');
import { fetchFromWebsites } from '../../utils/websitesApi';
import PlaceModel from '../models/placeModel';

export default async (req, res) => {
  const { input: place } = req.params;

  // first search placesDb see if we have it
  PlaceModel.find({ place }, async (err, result) => {
    if (err) return res.send(err);
    const entry = result[0];

    // if we do have it send it back
    if (entry) {
      console.info(`SUCCESSFULLY RETRIEVED ${entry.place} FROM DB`);
      return res.status(200).json(entry);
    }

    // if we don't have it try fetching from all the sites
    try {
      const html = await fetchFromWebsites(place);

      // once fetched create an entry to be saved in placesDb
      const newPlace = new PlaceModel({
        place,
        html,
      });

      // save it to placesDb and return the result which is the entry
      // so the return is ALWAYS from placesDb
      return newPlace.save((err, result) => {
        if (err) return res.json(err);
        console.info(`SUCCESSFULLY FETCHED AND SAVED ${result.place}`);
        return res.status(200).json(result);
      });
    } catch (err) {
      console.error('ERROR IN searchPlace:', err.response.statusText);
      return res.status(err.response.status).json(err.Error);
    }
  });
};
