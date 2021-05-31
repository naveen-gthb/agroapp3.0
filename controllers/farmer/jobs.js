const User = require('../../models/user');
const Product = require('../../models/product');
const Job = require('../../models/job');
const Application = require('../../models/application');



module.exports.index = async (req, res) => {
    const id = req.user._id;
    const jobs = await Job.find({quantity:{$gt:0},farmer:id});
    res.render('farmers/allJobs', { jobs})
}





module.exports.showJob = async (req, res,) => {
    const job = await Job.findById(req.params.id).populate('farmer');
    
    if (!job) {
        req.flash('error', 'Cannot find the job!');
        return res.redirect('/farmer/jobs');
    }
    const applications = await Application.find({job:req.params.id}).populate('worker');
    res.render('farmers/showJob', { job,applications });
}



// module.exports.hireWorker = async (req, res,next) => {
//     const id = req.params.id;
//     const workerId = req.params.workerId;
//     //console.log(req.body.order);
//     const job = new Job(id);
//     const equipment = await Product.findById(id);
//     equipment.quantity = equipment.quantity - order.quantity;
//     await equipment.save();
//     order.supplier = equipment.supplier;
//     order.product = equipment._id
//     order.farmer = req.user._id;
//     order.status = "not accepted";
//     order.type = "equipment";
//     await order.save();

//     req.flash('success', 'Farm Equipment requested sucessfully!');
//     res.redirect('/farmer/equipments');
// }


// module.exports.renderEquipmentOrderPage = async (req, res) => {
//     const id = req.params.id;
//     const equipment = await Product.findById(id).populate('supplier');
//     res.render('farmers/orderEquipmentPage',{equipment});
// }


// module.exports.rentEquipment = async (req, res,next) => {
//     const id = req.params.id;
//     //console.log(req.body.order);
//     const order = new Order(req.body.order);
//     const equipment = await Product.findById(id);
//     equipment.quantity = equipment.quantity - order.quantity;
//     await equipment.save();
//     order.supplier = equipment.supplier;
//     order.product = equipment._id
//     order.farmer = req.user._id;
//     order.status = "not accepted";
//     order.type = "equipment";
//     await order.save();

//     req.flash('success', 'Farm Equipment requested sucessfully!');
//     res.redirect('/farmer/equipments');
// }

// module.exports.showEquipmentOrder = async (req, res) => {
//     const id = req.params.id;
//     const order = await Order.findById(id).populate('supplier').populate('product');
//     res.render('farmers/showEquipmentOrder', { order })

// }