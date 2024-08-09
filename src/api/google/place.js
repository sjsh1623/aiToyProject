require('dotenv').config();
const axios = require("axios");

const ask = async (query) => {
	const googleMapApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.GOOGLE_API_KEY}&query=${query}`;
	try {
		const api = await axios.post(googleMapApiUrl);
		return api.data.results
	} catch (error) {
		console.error('Error occurred:', error.message);
	}
}

module.exports = async (place, city) => {
	const query = `${place} at ${city}`
	return await ask(query)
}
