const express = require('express')
const app = express();
const fs = require('fs');
const port = 4001;

app.get('/cart', (req, res) => {
    const itemArr = JSON.parse(fs.readFileSync("cart.json"))
    let totalPrice = 0;
    for (let j = 0; j < itemArr.length; j++) {
        totalPrice += parseFloat(itemArr[j].p_price * itemArr[j].p_quantity)
    }
    console.log(`Total amount of purchase:- ${totalPrice}`)
    res.status(200).json({
        message: "Data sending",
        cart: itemArr,
    });
})
app.get('/cart/:p_id', (req, res) => {
    const p_id = req.params.p_id;
    const content = JSON.parse(fs.readFileSync("cart.json"));
    const specific_item = content.filter(item => item.p_id == p_id)
    res.status(200).json({
        message: "Data Sending",
        data: specific_item
    })

})
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})