const placeDB = require('../models/Place');
const youtube = require('../api/youtube');
const googleMapTextSearch = require('../api/google/MapTextSearch');

const createPlan = async (location = {}) => {
	const {nation, city} = location;
	const url = 'BwUx4iAWiIo'
	const places = await getPlacesFromYoutube('korea', 'seoul', url);
}

const getPlacesFromYoutube = async (nation, city, url) => {
	const youTubeData = await youtube(url); // Get Youtube prompt
	const placesFromYoutube = await addInformationUsingGoogleMapApi(youTubeData, nation, city, url); // Get fixed Data
	savePlaces(placesFromYoutube) // Save to Database
	return placesFromYoutube;
}

const addInformationUsingGoogleMapApi = async (youTubeData, nation, city, url) => {
	const newDataArray = await Promise.all(
		youTubeData.map(async (element) => {
			const googlePlaceInfos = await googleMapTextSearch(element.place, city);
			if (!googlePlaceInfos || googlePlaceInfos.length === 0) return null;
			return googlePlaceInfos.map((googlePlaceInfo) => ({
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
					latitude: googlePlaceInfo.geometry.location.lat,
					longitude: googlePlaceInfo.geometry.location.lng
				}
			}));
		})
	);
	return newDataArray.flat().filter(item => item !== null);
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
