const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const JobSchema = new Schema({
    name: String,
    wage: Number,
    quantity: Number,
    description: String,
    landmark : String,
    city : String,
    applicants : Number,
    skills : String,
    gender : String,
    
    farmer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    } 
    
});



// ProductSchema.post('findOneAndDelete', async function (doc) {
//     if (doc) {
//         await Review.deleteMany({
//             _id: {
//                 $in: doc.reviews
//             }
//         })
//     }
// })

module.exports = mongoose.model('Job', JobSchema);