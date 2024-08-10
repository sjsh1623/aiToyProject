const placeDB = require('../models/place');
const youtube = require('../api/youtube');
const googleMapTextSearch = require('../api/google/mapTextSearch');

const createPlan = async (location = {}) => {
	const {nation, city} = location;
	const url = 'BwUx4iAWiIo'
	const places = await getPlacesFromYoutube(nation, city, url);
}

const getPlacesFromYoutube = async (nation, city, url) => {
	const youTubeData = await youtube(url); // Get Youtube prompt
	const placesFromYoutube = await addInformationUsingGoogleMapApi(youTubeData, nation, city, url); // Get fixed Data
	savePlaces(placesFromYoutube) // Save to Database
	return placesFromYoutube;
}

const addInformationUsingGoogleMapApi = async (youTubeData, nation, city, url) => {
	return await Promise.all(
		youTubeData.map(async (element) => {
			const googlePlaceInfo = await googleMapTextSearch(element.place, nation, city);
			return {
				...element,
				platform: 'youtube',
				place: googlePlaceInfo.name,
				address: googlePlaceInfo.formatted_address,
				city: city,
				nation: nation,
				url: url,
				rate: googlePlaceInfo.rating,
				rate_count: googlePlaceInfo.user_ratings_total,
				place_id: googlePlaceInfo.place_id,
				types: googlePlaceInfo.types,
				coordinates: {
					latitude: googlePlaceInfo.location.lat,
					longitude: googlePlaceInfo.location.lng
				}
			};
		})
	);
};

const savePlaces = (placesFromYoutube) => {
	try {
		for (const placeFromApi of placesFromYoutube) {
			placeDB.create(placeFromApi);
		}
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createPlan,
}
