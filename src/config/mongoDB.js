const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));
}