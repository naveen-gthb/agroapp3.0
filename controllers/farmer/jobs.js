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
    const applications = await Application.find({job:req.params.id,status:{$in:["not accepted","accepted","applied"]}}).populate('worker');
    res.render('farmers/showJob', { job,applications });
}

module.exports.renderNewJobPage = async (req, res) => {
    res.render('farmers/newJob');
}



module.exports.createJob = async (req, res, next) => {
    const job = new Job(req.body.job);
    console.log(job);
    job.farmer = req.user._id;
    job.applicants = 0;
    await job.save();
    //console.log(job);
    req.flash('success', 'Job Created Successfully!');
    res.redirect(`/farmer/jobs/${job._id}`)
}



module.exports.renderEditJobForm = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id)
    if (!job) {
        req.flash('error', 'Cannot find the Job!');
        return res.redirect('/farmer/jobs');
    }
    res.render('farmers/editJob', { job });
}



module.exports.updateJob = async (req, res) => {
    const { id } = req.params;
    //console.log(req.body);
    const job = await Job.findByIdAndUpdate(id, { ...req.body.job });
    
    await job.save();
    
    req.flash('success', 'Job Updated Successfully!');
    res.redirect(`/farmer/jobs/${job._id}`)
}

module.exports.deleteJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id)
    
    await Job.findByIdAndDelete(id);
    await Application.deleteMany({job:id});

    req.flash('success', 'Job Closed Successfully!')
    res.redirect('/farmer/jobs');
}



module.exports.hireWorker = async (req, res,next) => {
    const id = req.params.id;
    const application = await (await Application.findById(id)).populate('job');
    application.job.quantity = application.job.quantity - 1;
    application.status = "accepted"
    await application.save();
    
    req.flash('success', 'Application accepted!');
    res.redirect('/farmer/jobs');
}

module.exports.declineWorker = async (req, res,next) => {
    const id = req.params.id;
    const application = await (await Application.findById(id)).populate('job');
    application.status = "declined"
    await application.save();
    
    req.flash('success', 'Application declined successfully!');
    res.redirect('/farmer/jobs');
}


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