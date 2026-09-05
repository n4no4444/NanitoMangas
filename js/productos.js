// logica.js

// Lista de productos disponibles en el catálogo de NanitoMangas
const productos = [
    {
        id: 1,
        codigo: "MANGA-OP-001",
        titulo: "One Piece",
        volumen: 1,
        autor: "Eiichiro Oda",
        editorial: "Ivrea Ar",
        categoria: "Shonen",
        imagen: "img/OnePiece_1_IVREAAR.jpg",
        precio: 9990,
        stock: 20,
        stockCritico: 5,
        descripcion: "Monkey D. Luffy se hace a la mar en busca del legendario tesoro One Piece para convertirse en el Rey de los Piratas."
    },
    {
        id: 2,
        codigo: "MANGA-DH-001",
        titulo: "Dorohedoro",
        volumen: 1,
        autor: "Q Hayashida",
        editorial: "Panini",
        categoria: "Seinen",
        imagen: "img/Dorohedoro_1_PANINI.jpg",
        precio: 10990,
        stock: 12,
        stockCritico: 3,
        descripcion: "En una ciudad oscura llamada Hole, Caiman busca al hechicero que le transformó la cabeza en la de un reptil."
    },
    {
        id: 3,
        codigo: "MANGA-PUN-001",
        titulo: "Buenas Noches PunPun",
        volumen: 1,
        autor: "Inio Asano",
        editorial: "Ivrea Ar",
        categoria: "Seinen",
        imagen: "img/BuenasNochesPunpun_IVREAAR.jpg",
        precio: 9990,
        stock: 8,
        stockCritico: 2,
        descripcion: "La historia sigue la vida de Punpun Onodera, desde sus años de educación primaria hasta sus casi treinta años."
    },
    {
        id: 4,
        codigo: "MANGA-DLB-001",
        titulo: "Los Diarios De La Boticaria",
        volumen: 1,
        autor: "Maria V. Giner",
        editorial: "Panini",
        categoria: "Seinen / Misterio",
        imagen: "img/LosDiariosDeLaBoticaria_1_PANINI.jpg",
        precio: 10990,
        stock: 15,
        stockCritico: 4,
        descripcion: "Maomao, una joven boticaria, es secuestrada y vendida como sirvienta en el palacio imperial."
    },
    {
        id: 5,
        codigo: "MANGA-VAG-001",
        titulo: "Vagabond",
        volumen: 1,
        autor: "Takehiko Inoue",
        editorial: "Ivrea Ar",
        categoria: "Seinen",
        imagen: "img/Vagabond_1_IVREAAR.jpg",
        precio: 9990,
        stock: 6,
        stockCritico: 2,
        descripcion: "Basado en la vida del mítico espadachín Miyamoto Musashi y su camino para convertirse en invencible."
    },
    {
        id: 6,
        codigo: "MANGA-AWH-001",
        titulo: "Atelier of Witch Hat",
        volumen: 1,
        autor: "Kamome Shirahama",
        editorial: "Milky Way",
        categoria: "Fantasía",
        imagen: "img/AtelierOfWitchHat_1_MILKYWAY.jpg",
        precio: 12990,
        stock: 10,
        stockCritico: 3,
        descripcion: "Coco es una chica común que sueña con ser bruja en un mundo donde la magia se mantiene en secreto."
    },
    {
        id: 7,
        codigo: "MANGA-CSM-001",
        titulo: "Chainsaw Man",
        volumen: 1,
        autor: "Tatsuki Fujimoto",
        editorial: "Ivrea Ar",
        categoria: "Shonen",
        imagen: "img/ChainsawMan_1_IVREAAR.jpg",
        precio: 9990,
        stock: 25,
        stockCritico: 5,
        descripcion: "Denji vive ahogado en deudas hasta que muere y renace tras fusionarse con su demonio motosierra Pochita."
    },
    {
        id: 8,
        codigo: "MANGA-DDD-001",
        titulo: "Dandadan",
        volumen: 1,
        autor: "Yukinobu Tatsu",
        editorial: "Ivrea Ar",
        categoria: "Shonen",
        imagen: "img/Dandadan_1_IVREAAR.jpg",
        precio: 9990,
        stock: 18,
        stockCritico: 4,
        descripcion: "Una chica que cree en fantasmas y un chico obsesionado con alienígenas cruzan sus caminos."
    }
];

// Inicialización de funciones al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    actualizarContadorCarrito();
});

// Renderiza las tarjetas de manga dinámicamente en el HTML
function cargarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach(prod => {
        contenedor.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${prod.imagen}" class="card-img-top p-2" alt="${prod.titulo} Vol. ${prod.volumen}" style="height: 340px; object-fit: contain;">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary mb-2 align-self-start">${prod.categoria}</span>
                        <h5 class="card-title h6 fw-bold mb-1">${prod.titulo} Vol. ${prod.volumen}</h5>
                        <p class="small text-muted mb-1">Autor: ${prod.autor}</p>
                        <p class="small text-muted mb-2">Ed.: ${prod.editorial}</p>
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

// Agrega un manga al carrito y lo guarda en localStorage
function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const manga = productos.find(p => p.id === id);

    if (manga) {
        const existe = carrito.find(item => item.id === id);

        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push({
                id: manga.id,
                titulo: manga.titulo,
                volumen: manga.volumen,
                precio: manga.precio,
                imagen: manga.imagen,
                cantidad: 1
            });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContadorCarrito();
        alert(`¡"${manga.titulo} Vol. ${manga.volumen}" se añadió al carrito!`);
    }
}

// Actualiza la burbuja del carrito en la barra de navegación
function actualizarContadorCarrito() {
    const contador = document.getElementById("cart-count");
    if (!contador) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = total;
}