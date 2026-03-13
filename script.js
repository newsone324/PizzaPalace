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
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        if (cart[itemIndex].qty > 1) {
            cart[itemIndex].qty--;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
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

// clear cart
function clearCart() {
    cart = [];
    renderCart();
}

// reset custom pizza form
function resetCustomPizza() {
    // Reset all radio buttons (sauces)
    document.querySelectorAll('input[name="sauce"]').forEach(radio => {
        radio.checked = false;
    });

    // Reset all checkboxes (toppings)
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset the total display
    document.getElementById("custom-total").textContent = "10.00";

    // Clear the toppings display
    document.getElementById("pizza-toppings").innerHTML = "";
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

    // Custom pizza listeners
    document.querySelectorAll('.pizza-input').forEach(input => {
        input.addEventListener('change', renderCustomPizza);
    });

    document.querySelector('.custom-add-cart').addEventListener('click', () => {
        const total = Number(document.getElementById("custom-total").textContent);
        const selectedSauce = document.querySelector('input[name="sauce"]:checked');
        const selectedToppings = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.dataset.name);
        const name = `Custom Pizza (${selectedSauce ? selectedSauce.dataset.name : 'No Sauce'}, ${selectedToppings.join(', ') || 'No Toppings'})`;
        addToCart(name, total);
        resetCustomPizza();
        closeCustom();
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

    let total = 10; // base price

    // Add selected sauce
    const selectedSauce = document.querySelector('input[name="sauce"]:checked');
    if (selectedSauce) {
        total += Number(selectedSauce.dataset.price);
        const sauceDiv = document.createElement("div");
        sauceDiv.textContent = `Sauce: ${selectedSauce.dataset.name}`;
        toppingsContainer.appendChild(sauceDiv);
    }

    // Add selected toppings
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        total += Number(checkbox.dataset.price);
        const toppingDiv = document.createElement("div");
        toppingDiv.textContent = `Topping: ${checkbox.dataset.name}`;
        toppingsContainer.appendChild(toppingDiv);
    });

    totalDisplay.textContent = total.toFixed(2);
}

