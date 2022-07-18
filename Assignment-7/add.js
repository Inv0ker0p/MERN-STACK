const prompt = require('prompt-sync')();
const fs = require('fs');

function Item(id, name, quantity, price) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
}

exports.addItem = () => {
    const no_item = prompt('Enter no of Items :');
    let cart = [];
    for (let i = 0; i < no_item; i++) {
        const id = prompt('Enter id of item :');
        const name = prompt('Enter name of item :');
        const quantity = Number(prompt('Enter quantity of item :'));
        const price = Number(prompt('Enter price of item :'));
        const item = new Item(id, name, quantity, price);
        //cart =[...cart,item];
        cart.push(item);
        console.log(`cart ${JSON.stringify(cart)} :`);
    }
    //fs.writeFileSync("user.json",JSON.stringify(userArr));
    fs.writeFile("Cart.json", JSON.stringify(cart), (err) => {
        if (err)
            console.log('Something went Wrong')
        else
            console.log('Item is added to cart sucessfully !!');
    })
}