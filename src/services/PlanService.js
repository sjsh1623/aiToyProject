const mongoose = require('mongoose');
const place = require('../models/place');
const youtube = require('../api/youtube');

const createPlan = async (location = {}) => {
    const {nation, city} = location;
    const url = 'ZHci71eDC5o'
    const youTubeData = await youtube(url);
    const ytPlaces = addInfo(youTubeData, {city: 'seoul', nation: 'korea', url: url});

    try {
        for (const ytPlace of ytPlaces) {
            await place.create(ytPlace);
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
