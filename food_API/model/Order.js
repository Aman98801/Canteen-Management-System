const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    orderTime: String, 
    name: String, 
    phoneNumber: String, 
    userSEM: String, 
    userEnrollmentNo: String, 
    orderItems: Array 
    //[
    //     {itemID: Number, 
    //     itemName: String, 
    //     itemPrice: Number,  
    //     itemQuantity:Number,
    //    },
    //] 
},{ timeseries: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;