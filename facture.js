document.addEventListener('DOMContentLoaded', () => {
    const invoiceDetails = document.getElementById('invoice-details');

    // Récupérer les détails du panier depuis localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length > 0) {
        let invoiceHTML = '<h3>Détails de la commande</h3>';

        cart.forEach(item => {
            invoiceHTML += `
                <p>Produit: ${item.name}</p>
                <p>Quantité: ${item.quantity}</p>
                <p>Prix unitaire: ${item.price} CFA</p>
                <p>Sous-total: ${item.price * item.quantity} CFA</p>
                <hr>
            `;
        });

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        invoiceHTML += `<h3>Total: ${total} CFA</h3>`;

        invoiceDetails.innerHTML = invoiceHTML;

        // Vider le panier après avoir généré la facture
        localStorage.removeItem('cart');
    } else {
        invoiceDetails.innerHTML = '<p>Votre panier est vide.</p>';
    }
});

function printInvoice() {
    window.print();
}
