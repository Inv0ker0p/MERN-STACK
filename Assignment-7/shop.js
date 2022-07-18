const { addItem } = require('./add');
const { updateItem } = require('./update');
const { removeItem } = require('./remove');
const prompt = require('prompt-sync')();
const fs = require('fs');
const operation = prompt('Which operation need to perform :');

/*
add
update
remove
*/
switch (operation) {
    case 'add':
        addItem();
        break;
    case 'update':
        const id = prompt('Enter id to update :');
        updateItem(id);
        break;
    case 'remove':
        const id2 = prompt('Enter id to remove :');
        removeItem(id2);
        break;
    case 'total':
        let total = 0;
        let itemArr = JSON.parse(fs.readFileSync("cart.json"));
        for (let i = 0; i < itemArr.length; i++) {
            total += itemArr[i].quantity * itemArr[i].price;
        }
        console.log(`Total price of the cart: ${total}`);
        break;
    default:
        console.log('No operation is performed');
        break;
}