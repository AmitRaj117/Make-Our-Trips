const mongoose = require('mongoose');
const cities = require('./cities')
const Campground = require('../models/campground')
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb+srv://makeourtrip:1234@cluster0.e2nqx.mongodb.net/makeourtrip?retryWrites=true&w=majority')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6255b4dd1187d9d064840d1c',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random].city},${cities[random].state}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dfropsrgh/image/upload/v1646825819/YelpCamp/otkrzqwyhd1owgnxip9f.jpg',
                    filename: 'YelpCamp/otkrzqwyhd1owgnxip9f'
                }],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, deserunt et? Adipisci in quaerat, cupiditate repellat temporibus, ipsum culpa velit laborum nemo magnam et perspiciatis, eligendi dolore aperiam molestiae. Vitae.Recusandae, illo tenetur. Consequuntur dolorem repellat distinctio magnam quia a dolor accusamus eaque optio quis, repudiandae aperiam reprehenderit laudantium possimus voluptatem vel! Aliquid soluta nostrum, reiciendis dolores nobis nisi repellendus! Doloremque, quod mollitia aut accusantium eveniet vel odit veniam, sed, fuga soluta aliquid laboriosam. Illum enim quidem ut neque consequuntur error, aliquam deserunt cupiditate sapiente? Dolore minus odit et ullam.Necessitatibus est blanditiis asperiores, neque perferendis minus assumenda cumque laborum voluptates quas ullam, officiis distinctio repudiandae consequuntur corporis eos sint maxime officia illum libero hic? eaque rem nihil tempora.Odio dignissimos nemo blanditiis reprehenderit animi natus nihil hic libero optio totam sed impedit, quas esse, ullam molestiae, aliquid recusandae! Aperiam facilis ad tempora quo culpa qui dolores eaque dolor.',
            price
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});