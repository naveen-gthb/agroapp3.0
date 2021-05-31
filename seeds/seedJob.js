const mongoose = require('mongoose');
const Job = require('../models/job');

mongoose.connect('mongodb://localhost:27017/agro-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Job.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const wage = Math.floor(Math.random() * 20) + 10;
        const job = new Job({
            farmer: '60b3a4d7895de81594ec2d75',
            name: `Onion Cultivation`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            wage,
            quantity:wage+3,
            applicants : 0,
            landmark : "Kondhwa",
            city : "Pune",
            skills : "Plant Grafting,Onion Cultivation,Sowing,Ploughing",
            gender : "Male"

            
        })
        await job.save();
    }


    
}

seedDB().then(() => {
    mongoose.connection.close();
})