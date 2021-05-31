const User = require('../../models/user');
const Job = require('../../models/job');
const Application = require('../../models/application');

module.exports.renderInfoPage = (req, res) => {
    res.render('workers/addInfo');
}

module.exports.renderWorkerPage = (req, res) => {
    res.render('workers/workerPage');
}

module.exports.addInfo = async (req, res)  => {
    const worker = req.body;
    console.log(worker);
    const id = req.user._id;
    const user= await User.findByIdAndUpdate(id,worker);
    await user.save();
    req.flash('success', 'Information Added Successfully!');
    res.redirect(`/worker`)
}

module.exports.index = async (req, res) => {
    const jobs = await Job.find();
    res.render('workers/allJobs', { jobs })
}


module.exports.showJob = async (req, res,) => {
    const job = await Job.findById(req.params.id).populate('farmer');
    if (!job) {
        req.flash('error', 'Job not available!');
        return res.redirect('/worker/jobs');
    }
    res.render('workers/showJob', { job });
}

module.exports.applyJob = async (req, res) => {
    // const job = await Job.findById(req.params.id);
    const id = req.params.id;
    const application = await new Application({worker:req.user._id,job:id});
    
    
    await application.save();
    

    req.flash('success', 'Applied Successfully!');

    res.redirect(`/worker/jobs/${id}`);
    
}

