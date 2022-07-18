const prompt = require('prompt-sync')();
const fs = require('fs');

function Item(id, name, quantity, price) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
}

exports.removeItem = (id) => {
    let cart = JSON.parse(fs.readFileSync("cart.json"));
    cart = cart.filter(cart => cart.id != id)
    fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err)
            console.log('Something went Wrong')
        else
            console.log(`user with ${id} updated sucessfully !!`);
    })
}