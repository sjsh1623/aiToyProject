const mongoose = require('mongoose');

module.exports = () => {
	mongoose.connect(process.env.MONGODB_URL).then(() => console.log('Successfully connected to mongodb'))
		.catch(e => console.error(e));
}
