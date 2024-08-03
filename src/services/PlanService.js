const mongoose = require('mongoose');
const placeModel = require('../models/PlaceModel');
const youtube = require('../api/youtube');

const createPlan = async (location = {}) => {
    const {nation, city} = location;
    const url = 'ZHci71eDC5o'
    const youTubeData = await youtube(url);
    const ytPlaces = addInfo(youTubeData, {city: 'seoul', nation: 'korea', url: url});

    try {
        for (const ytPlace of ytPlaces) {
            const place = new placeModel(ytPlace);
            await place.save();
        }
    } catch (error) {
        throw error;
    }
}

const addInfo = (places, info) => {
    const {nation, city, url} = info;
    places.forEach(element => {
       element.city = city;
       element.nation = nation;
       element.url = url;
    });
    return places;
};

module.exports = {
    createPlan,
}