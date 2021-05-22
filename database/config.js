const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Connected to the database');

    } catch(error) {

        console.log(error);
        throw new Error('Failed to connect to database');

    }

}

module.exports = {
    dbConnection
};