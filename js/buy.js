const compra = new Carrito();
const listaCompra = document.querySelector(".order tbody");
const carrito = document.getElementById('transaction');

cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    compra.calcularTotal();

    carrito.addEventListener('change', e => { 
        compra.obtenerEvento(e) 
    });
    
    carrito.addEventListener('keyup', e => { 
        compra.obtenerEvento(e) 
    });
}