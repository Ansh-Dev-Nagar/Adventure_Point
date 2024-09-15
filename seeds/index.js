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
    await adventurePlace.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random180 = Math.floor(Math.random() * Math.min(180, cities.length));
        const price = Math.floor(Math.random()*50)+10;
        const place = new adventurePlace({
            location: `${cities[random180].city}, ${cities[random180].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://picsum.photos/400?random=${Math.random()}',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. At culpa modi harum incidunt nihil, est illum voluptatum. Voluptas mollitia perferendis placeat, fuga suscipit maxime explicabo dolore cum facilis minima aperiam.',
            price
        })
        await place.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})