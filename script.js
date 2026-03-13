let cart = [];

// add item to cart
function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    renderCart();
}

// remove item
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    renderCart();
}

// render cart
function renderCart() {

    const cartContainer = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("cart-total");

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        const div = document.createElement("div");

        div.innerHTML = `
            ${item.name} - $${item.price} x ${item.qty}
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;

        cartContainer.appendChild(div);

        total += item.price * item.qty;
    });

    totalDisplay.textContent = total;
}

// button listeners
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".add-cart").forEach(button => {

        button.addEventListener("click", () => {

            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            addToCart(name, price);

        });

    });

});

// modal controls
function openCart() {
    document.getElementById("cart-modal").style.display = "block";
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}


let toppings = [];
//custom pizza modal
function openCustom() {
    document.getElementById("pizza-modal").style.display = "block";
}

function closeCustom() {
    document.getElementById("pizza-modal").style.display = "none";
}

//render the pizza
function renderCustomPizza() {
    const toppingsContainer = document.getElementById("pizza-toppings");
    const totalDisplay = document.getElementById("custom-total");

    toppingsContainer.innerHTML = "";

    //TODO: set up structure for toppings
}


//customizable pizza
function addCustomPizza(name, price) {
    let basePrice = 10;
    let totalPrice = basePrice;

    //get the sauce
    const sauce = document.querySelector("input[name='sauce']:checked");


}

//add toppings to the custom pizza
function addTopping(name, price) {
    toppings.push({
            name: name,
            price: price
        });
        console.log(toppings);
}

document.querySelectorAll(".topping").forEach(input => {
    input.addEventListener("change", () => {
        const name = input.dataset.name;
        const price = input.dataset.price;

        addTopping(name, price);
        console.log("clicked!");
    })
});
