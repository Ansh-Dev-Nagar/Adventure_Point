const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const adventurePlace = require('../models/adventureplace');

mongoose.connect('mongodb://localhost:27017/adventure-point');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    try {
        await adventurePlace.deleteMany({});
        console.log("Deleted existing adventure places");

        for (let i = 0; i < 50; i++) {
            const random180 = Math.floor(Math.random() * Math.min(180, cities.length));
            const price = Math.floor(Math.random() * 50) + 10;
            const place = new adventurePlace({
                author: '670e8937fc7583e4b096d1e5',
                location: `${cities[random180].city}, ${cities[random180].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. At culpa modi harum incidunt nihil, est illum voluptatum. Voluptas mollitia perferendis placeat, fuga suscipit maxime explicabo dolore cum facilis minima aperiam.',
                price,
                images: [
                    {
                      url: 'https://res.cloudinary.com/drtqz3tn5/image/upload/v1729219828/AdventurePlace/ra2hkba7vgzjbaf18vsj.jpg',
                      filename: 'AdventurePlace/ra2hkba7vgzjbaf18vsj'    
                    },
                    {
                      url: 'https://res.cloudinary.com/drtqz3tn5/image/upload/v1729219830/AdventurePlace/h21uoty5am8wmd6m70pw.jpg',
                      filename: 'AdventurePlace/h21uoty5am8wmd6m70pw'    
                    }
                ]
            });
            await place.save();
        }
        console.log("Seeding complete");
    } catch (error) {
        console.error("Error during seeding:", error);
    }
}

seedDB().then(() => {
    mongoose.connection.close();
}).catch(err => {
    console.error("Error closing MongoDB connection:", err);
});
