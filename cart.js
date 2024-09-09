function menutoggle() {
    var menuItems = document.getElementById("MenuItems");
    menuItems.classList.toggle("active");
}


document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Fetch cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render cart items
    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h4>${item.name} - ${item.price} CFA</h4>
                <div class="quantity-controls">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="increase-quantity" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Supprimer</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Update cart total
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotalElement.innerText = `${total} CFA`;
    };

    // Function to show alert
    const showAlert = (message) => {
        alert(message);
    };

    // Event listener for adding items to the cart
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default action if button is a link or form
            const productId = button.getAttribute('data-product-id');
            const productElement = button.closest('.col-4');
            const productName = productElement.querySelector('h4').innerText;
            const productPrice = parseInt(productElement.querySelector('p').innerText.replace(' CFA', ''));

            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Show alert
            showAlert('Produit ajouté au panier!');

            // Optionally update cart display on the current page
            // renderCartItems();
        });
    });

    // Event listener for removing items from the cart
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);

            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    });

    // Event listener for increasing item quantity
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('increase-quantity')) {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity += 1;

            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    });

    // Event listener for decreasing item quantity
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('decrease-quantity')) {
            const index = e.target.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else if (cart[index].quantity === 1) {
                cart[index].quantity = 0; // Set quantity to 0 instead of removing
            }

            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    });

    // Initial render of cart items on the cart page
    if (window.location.pathname.endsWith('cart.html')) {
        renderCartItems();
    }
});




