const prompt = require('prompt-sync')();
const fs = require('fs');

function Item(id, name, quantity, price) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
}
exports.updateItem = (id) => {
    let itemArr = JSON.parse(fs.readFileSync("Cart.json"));
    cart = itemArr.filter(cart => cart.id != id)
    for (let i = 0; i < itemArr.length; i++) {
        if (itemArr[i].id == id) {
            const quantity = Number(prompt('Enter quantity of item :'));
            const cartObj = new Item(id, itemArr[i].name, quantity, itemArr[i].price);
            cart = [...cart, cartObj];

        }
    }
    fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err)
            console.log('Something went Wrong')
        else
            console.log(`user with ${id} updated sucessfully !!`);
    })
}