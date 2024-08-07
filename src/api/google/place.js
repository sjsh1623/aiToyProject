require('dotenv').config();

const ask = async (query) => {
	const googleMapApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.GOOGLE_API_KEY}`;
	const axios = require("axios");
	try {
		const api = await axios.post(googleMapApiUrl, {
			query: query,
		});
		return api.data.results
	} catch (error) {
		console.error('Error occurred:', error.message);
	}
}

module.exports = async (place, city) => {
	const query = `${place} at ${city}`
	return await ask(query)
}
