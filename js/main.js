// js/main.js

document.addEventListener("DOMContentLoaded", () => {
    renderizarDestacados();
    actualizarContadorCarrito();
});

// Función para cargar tarjetas de productos en el index.html
function renderizarDestacados() {
    const contenedor = document.getElementById("contenedor-destacados");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    // Mostramos los primeros 4 mangas en el Home
    productos.slice(0, 4).forEach(prod => {
        contenedor.innerHTML += `
            <div class="col-12 col-sm-6 col-md-3">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}" style="height: 320px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-dark text-warning mb-2 align-self-start">${prod.categoria}</span>
                        <h5 class="card-title h6 fw-bold">${prod.nombre}</h5>
                        <p class="small text-muted mb-2">Editorial: ${prod.editorial}</p>
                        <p class="fw-bold text-success fs-5 mt-auto">$${prod.precio.toLocaleString('es-CL')}</p>
                        <div class="d-grid gap-2">
                            <a href="detalle-producto.html?id=${prod.id}" class="btn btn-outline-dark btn-sm">Ver Detalle</a>
                            <button class="btn btn-warning btn-sm fw-bold" onclick="agregarAlCarrito(${prod.id})">Añadir al Carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// Función para añadir mangas al carrito (localStorage)
function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoEncontrado = productos.find(p => p.id === id);

    if (productoEncontrado) {
        const itemExistente = carrito.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({
                id: productoEncontrado.id,
                nombre: productoEncontrado.nombre,
                precio: productoEncontrado.precio,
                imagen: productoEncontrado.imagen,
                cantidad: 1
            });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContadorCarrito();
        alert(`¡"${productoEncontrado.nombre}" añadido a tu carrito de NanitoMangas!`);
    }
}

// Actualiza la cifra que sale en el icono del carrito en el navbar
function actualizarContadorCarrito() {
    const contador = document.getElementById("cart-count");
    if (!contador) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalUnidades;
}