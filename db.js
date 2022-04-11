const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.DB_URI, connectionParams);
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error connecting to DB');
    }
}