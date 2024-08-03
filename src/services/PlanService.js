const mongoose = require('mongoose');
const placeModel = require('../models/PlaceModel');
const youtube = require('../api/youtube');

const createPlan = async (location = {}) => {
    const {nation, city} = location;
    const url = 'ZHci71eDC5o'
    //const youTubeData = await youtube(url);
    const youTubeData = `  [ { "name": "Beacon", "description": "They're known for their French toast and I actually saw them on Instagram we're going to grab some breakfast there today is a Saturday though so I feel like a lot of those cafes are going to be very busy but we're going right during opening time so hopefully not.", "feature": "French toast" }, { "name": "House of vinyl", "description": "This Cafe is so cute I believe that you can pick one LP per customer to play in the cafe and the sound quality is great we came right at opening it opened like 10 minutes ago and almost every table is filled up I love all the furniture and decor and all the lamps in here just very athetic", "feature": "Vinyl record selection" }, { "name": "Mangan market", "description": "It's the weekend so the streets are busy we're going to go grab some quick lunch going to eat Tui going to get Tui o and some King from street food stall it's a must eat when you come to Korea especially during the winter time the street food tastes so good", "feature": "Street food" }, { "name": "Chopar Donuts", "description": "These donuts are so good so chewy I eat like 10 of these yummy yummy", "feature": "Donuts" }, { "name": "Olive young", "description": "I bought a whole bag of stuff I don't even know if I can fit this in my suitcase", "feature": "Shopping" } ]`
    const ytPlaces = addInfo(JSON.parse(youTubeData), {nation, city, url});
    //const session = await mongoose.startSession();
   // session.startTransaction();
    try {
        for (const ytPlace of ytPlaces) {
            //console.log(ytPlace)
            //const place = new placeModel(ytPlace);
            //await place.save({session});
        }
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
}

const addInfo = (places, info) => {
    const {nation, city, url} = info;
    places.forEach(element => {
        console.log(element)
       element.city = city;
       element.nation = nation;
       element.url = url;
    });
    console.log(places)
    return places;
}

module.exports = {
    createPlan,
}