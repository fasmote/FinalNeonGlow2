
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
const subtotalElement = document.createElement("div");
subtotalElement.id = "subtotal-flotante";
document.body.appendChild(subtotalElement);

productos.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>
    `;
    card.addEventListener("mouseover", () => {
        card.style.transform = "scale(1.05)";
        card.style.boxShadow = "0 4px 10px rgba(255, 255, 255, 0.5)";
    });
    card.addEventListener("mouseout", () => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "none";
    });
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
    mostrarEfectoAgregado();
}

// Renderizar carrito
function renderCarrito() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    if (carrito.length === 0) {
        cartItems.innerHTML = "<p>Tu carrito está vacío.</p>";
        subtotalElement.style.display = "none";
        return;
    }

    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
            <p>${item.nombre} x ${item.cantidad} - $${item.precio * item.cantidad}</p>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);
    });

    subtotalElement.textContent = `Subtotal: $${subtotal}`;
    subtotalElement.style.display = "block";
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

// Mostrar efecto de agregado
function mostrarEfectoAgregado() {
    subtotalElement.style.backgroundColor = "rgba(255, 0, 102, 0.9)";
    subtotalElement.style.color = "white";
    subtotalElement.style.padding = "10px";
    subtotalElement.style.borderRadius = "8px";
    subtotalElement.style.position = "fixed";
    subtotalElement.style.bottom = "20px";
    subtotalElement.style.right = "20px";
    subtotalElement.style.zIndex = "1000";
    subtotalElement.style.transition = "all 0.3s ease";

    setTimeout(() => {
        subtotalElement.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    }, 500);
}

// Renderizar carrito al cargar la página
renderCarrito();
