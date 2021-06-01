const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const products = require('../controllers/farmer/products');
const equipments = require('../controllers/farmer/equipments');
const jobs = require('../controllers/farmer/jobs');
const { isLoggedIn,gaveInfo} = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });



router.route('/addInfo')
    .get(isLoggedIn,products.renderInfoPage)
    .post(isLoggedIn,products.addInfo)
    




router.route('/products/:id/order')
    .get(isLoggedIn,products.renderOrderPage)
    .post(isLoggedIn, catchAsync(products.orderProduct))

// router.route('/products/order')
//     .post(isLoggedIn, catchAsync(farmers.orderProduct))


router.route('/products/:id')
    .get(isLoggedIn,products.showProduct)

router.route('/products')
    .get(isLoggedIn,products.index)


    


router.route('/orders/:id/cancel')
    .post(isLoggedIn,catchAsync(products.cancelOrder))

router.route('/orders/:id')
    .get(isLoggedIn, gaveInfo, products.showOrder)

router.route('/orders')
    .get(isLoggedIn, gaveInfo, products.showAllOrders)


router.route('/equipments/:id/order')
    .get(isLoggedIn,equipments.renderEquipmentOrderPage)
    .post(isLoggedIn, catchAsync(equipments.rentEquipment))

router.route('/equipments/:id')
    .get(isLoggedIn,equipments.showEquipment)

router.route('/equipments')
    .get(isLoggedIn,equipments.index)

// router.route('/jobs/:id/hire/:workerId')
//     .get(isLoggedIn,gaveInfo,jobs.hireWorker)





router.route('/jobs/new')
    .get(isLoggedIn,gaveInfo,jobs.renderNewJobPage)

    
router.get('/jobs/:id/edit', isLoggedIn, /*isAuthor,*/ catchAsync(jobs.renderEditJobForm))


router.route('/jobs/:id/hire')
    .get(isLoggedIn,gaveInfo,jobs.hireWorker)


router.route('/jobs/:id/decline')
    .get(isLoggedIn,gaveInfo,jobs.declineWorker)
    





router.route('/jobs/:id')
    .get(isLoggedIn,gaveInfo,jobs.showJob)
    .put(isLoggedIn,gaveInfo /*isAuthor,*/ , catchAsync(jobs.updateJob))
    .delete(isLoggedIn,gaveInfo /*isAuthor,*/,catchAsync(jobs.deleteJob));




router.route('/jobs')
    .get(isLoggedIn,gaveInfo,jobs.index)
    .post(isLoggedIn,gaveInfo,jobs.createJob)

router.route('/')
    .get(isLoggedIn, gaveInfo, products.renderFarmerPage)
    //.post(catchAsync(suppliers.register));


    





module.exports = router;