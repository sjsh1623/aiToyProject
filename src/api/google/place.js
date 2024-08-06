require('dotenv').config();

const ask = async (query) => {
	const googleMapApiUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";
	const axios = require("axios");
	try {
		const result = await axios.post(googleMapApiUrl, {
			textQuery: query,
			key : process.env.GOOGLE_API_KEY
		});
		return result
	} catch (error) {
		console.error('Error occurred:', error.message);
	}
}

module.exports = async (place, city) => {
	const query = `${place} ${city}`
	return await ask(query)
}
