let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 8;

loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.box-container .box')];
    for (let i = currentItem; i < currentItem + 4; i++) {
        if (boxes[i]) {
            boxes[i].style.display = 'inline-block';
        }
    }
    currentItem += 4;
    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// CARRITO
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const notification = document.getElementById('notification');

let total = 0; // Variable para almacenar el total

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.closest('.box');
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    };
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    const precio = parseFloat(elemento.precio.replace('$', '').replace(',', '')); // Formato del precio
    row.innerHTML = `
        <td> 
            <img src="${elemento.imagen}" width="100" height="150"> 
        </td>
        <td>${elemento.titulo}</td>
        <td>$${precio.toFixed(2)}</td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
    lista.appendChild(row);

    // Actualizar el total
    total += precio;
    actualizarTotal();
    mostrarNotificacion(`Agregaste ${elemento.titulo} al carrito`);
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        const elemento = e.target.closest('tr');
        const precio = parseFloat(elemento.cells[2].textContent.replace('$', '').replace(',', ''));
        total -= precio; // Restar el precio del total
        elemento.remove(); // Eliminar la fila
        actualizarTotal();
        mostrarNotificacion(`Eliminaste un producto del carrito`);
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    total = 0; // Reiniciar total
    actualizarTotal();
    mostrarNotificacion(`El carrito ha sido vaciado`);
}

function mostrarNotificacion(mensaje) {
    notification.textContent = mensaje;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Ocultar después de 3 segundos
}

function actualizarTotal() {
    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: $${total.toFixed(2)}`; // Actualizar el texto del total
}

// Ajustar el tamaño de la fuente
const body = document.body;
let fontSize = 16; // Tamaño de letra inicial

document.getElementById('increase').addEventListener('click', () => {
    fontSize += 2; // Aumentar 2px
    body.style.fontSize = fontSize + 'px';
});

document.getElementById('decrease').addEventListener('click', () => {
    fontSize -= 2; // Disminuir 2px
    body.style.fontSize = fontSize + 'px';
});

// Mostrar/Ocultar el submenú de accesibilidad
document.getElementById('accessibility-toggle').addEventListener('click', (e) => {
    e.preventDefault();
    const submenu = document.getElementById('accessibility-menu');
    submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
});

function mostrarNotificacion(mensaje) {
    notification.textContent = mensaje;
    notification.style.display = 'block'; // Mostrar notificación
    notification.classList.add('show'); // Asegúrate de que tengas estilos CSS para esta clase
    setTimeout(() => {
        notification.classList.remove('show'); // Remover la clase de estilo
        setTimeout(() => {
            notification.style.display = 'none'; // Ocultar después de 3 segundos
        }, 500); // Tiempo para desvanecer
    }, 3000); // Mostrar por 3 segundos
}

// Animacion inicio de sesion

const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click",()=>{
   container.classList.remove("toggle");
});
btnSignUp.addEventListener("click",()=>{
   container.classList.add("toggle");
});
