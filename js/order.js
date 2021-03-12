const carro = new Carrito();
const productos = document.getElementById('catalog__items');
const procesarPedidoBtn = document.getElementById('cart');

cargarEventos();

function cargarEventos() {
    //Se ejecuta cuando se presiona el botón [agregar carrito]
    productos.addEventListener('click', e => {
        carro.comprarProducto(e)
    });

    //Se ejecuta cuando se presiona el menu [carrito de compra]
    procesarPedidoBtn.addEventListener('click', e => {
        carro.procesarPedido(e)
    });
}