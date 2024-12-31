// Array de productos
const productos = [
    { id: 1, nombre: "Hamburguesa", precio: 5, imagen: "images/hamburguesa.png" },
    { id: 2, nombre: "Pancho", precio: 3, imagen: "images/pancho.png" },
    { id: 3, nombre: "Papas Fritas", precio: 4, imagen: "images/papas.png" },
    { id: 4, nombre: "Gaseosa", precio: 2, imagen: "images/gaseosa.png" },
    { id: 5, nombre: "Helado", precio: 3, imagen: "images/helado.png" },
    { id: 6, nombre: "Pochoclos", precio: 2, imagen: "images/pochoclos.png" },
    { id: 7, nombre: "Café", precio: 1, imagen: "images/cafe.png" },
    { id: 8, nombre: "Medialunas", precio: 3, imagen: "images/medialunas.png" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Renderizar productos
const productList = document.getElementById("product-list");
productos.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>
    `;
    productList.appendChild(card);
});

// Agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    const itemEnCarrito = carrito.find(item => item.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

// Renderizar carrito
function renderCarrito() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    if (carrito.length === 0) {
        cartItems.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    carrito.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
            <p>${item.nombre} x ${item.cantidad} - $${item.precio * item.cantidad}</p>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Eliminar del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

// Vaciar carrito
document.getElementById("clear-cart").addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
});

// Validar formulario de contacto
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Por favor, complete todos los campos del formulario.");
        return;
    }

    alert("Formulario enviado exitosamente. ¡Gracias por contactarnos!");
    contactForm.reset();
});

// Renderizar carrito al cargar la página
renderCarrito();


// Responsividad del menú
document.querySelector('.menu-toggle').addEventListener('click', function () {
    this.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
});

// Carrito de compras con localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', (e) => {
        const productName = e.target.parentElement.querySelector('h3').innerText;
        const productPrice = e.target.parentElement.querySelector('p').innerText.replace('$', '');

        const product = { name: productName, price: parseFloat(productPrice) };
        cart.push(product);

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} añadido al carrito`);
    });
});
