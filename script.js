const products = [
    { id: 1, name: "Camisa Preta oversized", size: "M", price: 50.0, image: "imagens/camisapreta.jpg" },
    { id: 2, name: "Camisa Preta oversized", size: "M", price: 50.0, image: "imagens/camisapreta.jpg" },
    { id: 3, name: "Camisa Preta oversized", size: "M", price: 50.0, image: "imagens/camisapreta.jpg" },
    { id: 4, name: "Camisa Preta oversized", size: "M", price: 50.0, image: "imagens/camisapreta.jpg" },
    { id: 5, name: "Camisa Preta oversized", size: "M", price: 50.0, image: "imagens/camisapreta.jpg" },
    { id: 6, name: "Camisa Preta oversized", size: "M", price: 50.0, image: "imagens/camisapreta.jpg" },
    { id: 7, name: "Camisa Preta oversized", size: "M", price: 50.0, image: "imagens/camisapreta.jpg" },
    { id: 8, name: "Camisa Preta oversized", size: "M", price: 50.0, image: "imagens/camisapreta.jpg" },
];

const itemsPerPage = 8;
let currentPage = 1;
let cart = [];

function renderProducts() {
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const visibleProducts = products.slice(start, end);

    visibleProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Tamanho: ${product.size}</p>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        productGrid.appendChild(productDiv);
    });

    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = end >= products.length;
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        updateCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.onclick = () => removeFromCart(item.id);

        listItem.appendChild(removeButton);
        cartItems.appendChild(listItem);
    });
}

function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const message = cart
        .map(item => `${item.name} - R$ ${item.price.toFixed(2)}`)
        .join("\n");

    const whatsappUrl = `https://wa.me/34997096899?text=${encodeURIComponent(
        "Pedido:\n" + message
    )}`;
    window.open(whatsappUrl, "_blank");
}

document.getElementById("prevPage").addEventListener("click", () => {
    currentPage--;
    renderProducts();
});

document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    renderProducts();
});

document.getElementById("checkout").addEventListener("click", checkout);

renderProducts();
