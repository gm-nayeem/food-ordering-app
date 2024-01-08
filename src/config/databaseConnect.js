import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;
if (!URL) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const options = {
    dbName: "food-ordering-app",
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}

let isConnected = false; // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(URI, options);

        isConnected = true;

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}