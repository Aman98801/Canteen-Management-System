const express = require("express");
const bodyParser = require("body-parser");
const { path } = require("express/lib/application");

const { default: mongoose } = require("mongoose");
const Order = require('./model/Order')

const app = express();

// connet to mongoDB
const mdbURI = "mongodb+srv://sumit_bu_7:$_u9tYs4fnyuTJ6@cluster0.jhjqq.mongodb.net/CantinOrders?retryWrites=true&w=majority";
mongoose.connect(mdbURI)
  .then((result) => console.log('Connect to DB'))
  .catch((e) => console.log(e));


app.use(express.static("public"));

var jsonParser = bodyParser.json()

app.get("/", function (req, res) {
    res.send('HI');

    
}); 

app.post('/data', jsonParser, function(req, res){

    const postedOrderData = req.body;

    const orderItmesList = postedOrderData.orderItems;

    // console.log(orderItmesList);
    
    const order = new Order({
        orderTime: postedOrderData.orderTime, 
        name: postedOrderData.name, 
        phoneNumber: postedOrderData.PhoneNumber,
        userSEM: postedOrderData.userSEM,
        userEnrollmentNo: postedOrderData.userEnrollmentNo,
        orderItems: orderItmesList,
        
        
    });

    order.save()
    //  .then((response)=> res.send({'orderName': response})) == See Added Order
    //  .catch((e) => res.send(e))  == See Error 
    
    res.send({'orderName':postedOrderData.name});

});

app.get('/user/pyi/dashboard', function(req, res){
 
    Order.find()
        .then((response)=> res.send(response))
        .catch((e) => res.send(e))

} )

app.get("*", function (req, res) {
    res.send("page not found");
});



let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("server is started in port 3000");
});