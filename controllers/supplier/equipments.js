const Product = require('../../models/product');
const Order = require('../../models/order');
const { cloudinary } = require("../../cloudinary");



module.exports.index = async (req, res) => {
    const equipments = await Product.find({supplier:req.user._id,type:"equipment"});
    res.render('suppliers/allEquipments', { equipments })
}


module.exports.renderNewEquipmentForm = (req, res) => {
    res.render('suppliers/newEquipment');
}


module.exports.createEquipment = async (req, res, next) => {
    const equipment = new Product(req.body.equipment);
    //console.log(product);
    equipment.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    equipment.supplier = req.user._id;
    equipment.ratingSum = 0;
    equipment.reviewCount = 0;
    equipment.type = "equipment";
    await equipment.save();
    //console.log(product);
    req.flash('success', 'Farm Equipment Added Successfully!');
    res.redirect(`/supplier/equipments/${equipment._id}`)
}



module.exports.showEquipment = async (req, res,) => {
    const equipment = await Product.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('supplier');
    if (!equipment) {
        req.flash('error', 'Cannot find the Equipment!');
        return res.redirect('/supplier/equipments');
    }
    res.render('suppliers/showEquipment', { equipment });
}


module.exports.renderEditEquipmentForm = async (req, res) => {
    const { id } = req.params;
    const equipment = await Product.findById(id)
    if (!equipment) {
        req.flash('error', 'Cannot find the Farm Equipment!');
        return res.redirect('/supplier/equipments');
    }
    res.render('suppliers/editEquipment', { equipment });
}


module.exports.updateEquipment = async (req, res) => {
    const { id } = req.params;
    //console.log(req.body);
    const equipment = await Product.findByIdAndUpdate(id, { ...req.body.equipment });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    equipment.images.push(...imgs);
    await equipment.save();
    
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await equipment.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    
    req.flash('success', 'Farm Equipment updated Successfully!');
    res.redirect(`/supplier/equipments/${equipment._id}`)
}


module.exports.deleteEquipment = async (req, res) => {
    const { id } = req.params;
    const equipment = await Product.findById(id)
    for (let image of equipment.images) {
        await cloudinary.uploader.destroy(image.filename);
    }
    await Product.findByIdAndDelete(id);
    await Order.deleteMany({product:id});

    req.flash('success', 'Farm Equipment Deleted Successfully!')
    res.redirect('/supplier/equipments');
}




module.exports.acceptOrder = async (req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id);
    order.status = "accepted";
    order.save();
    res.redirect(`/supplier/orders/${id}`); 

}


module.exports.cancelOrder = async (req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id);
    order.status = "cancelled by supplier";
    const product = await Product.findById(order.product);
    product.quantity = product.quantity + order.quantity;    
    order.save();
    product.save();
    req.flash('success', 'Order Declined Successfully!');
    res.redirect(`/supplier/orders`);

}