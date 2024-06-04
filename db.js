const mongoose = require('mongoose');


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

module.exports = mongoose;