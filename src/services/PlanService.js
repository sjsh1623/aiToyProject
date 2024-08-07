const place = require('../models/place');
const youtube = require('../api/youtube');
const googlePlace = require('../api/google/place');

const createPlan = async (location = {}) => {
    const {nation, city} = location;
    const url = 'ZHci71eDC5o'
    const youTubeData = await youtube(url);
    const ytPlaces = await addInfo(youTubeData, {city: 'seoul', nation: 'korea', url: url});
    try {
        for (const ytPlace of ytPlaces) {
            await place.create(ytPlace);
        }
    } catch (error) {
        throw error;
    }
}

const addInfo = async (places, info) => {
    const {nation, city, url} = info;
    for (const element of places) {
        element.address = await googlePlace(element.place, city);
        element.city = city;
        element.nation = nation;
        element.url = url;
    }
    return places;
};

module.exports = {
    createPlan,
}
