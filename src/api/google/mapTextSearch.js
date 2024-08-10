require('dotenv').config();
const axios = require("axios");

const ask = async (query) => {
	const googleMapApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.GOOGLE_API_KEY}&query=${query}`;
	try {
		const response = await axios.post(googleMapApiUrl);
		console.log(response.data)
		return extractPlaceDetails(response.data);
	} catch (error) {
		console.error('Error occurred:', error.message);
	}
}

const extractPlaceDetails = ({ formatted_address, name, rating, place_id, types ,user_ratings_total, geometry}) => ({
	formatted_address,
	name,
	rating,
	place_id,
	types,
	user_ratings_total,
	geometry,
});

module.exports = async (place, nation, city) => {
	const query = `${place} at ${city}`
	return await ask(query)
}
