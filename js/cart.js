const catalog_items = document.querySelector('.catalog__items')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById('template-footer').content
const payments = document.querySelector('.payments')
const fragment = document.createDocumentFragment()
let carrito = {}

// Se dispara cuando el documento html a sido cargado y ejecuta una función
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
        mostrarRealizarCompra()
    }
})

// Llama al método addCarrito()
catalog_items.addEventListener('click', e => {
    addCarrito(e)
    swal("Se agregó el producto satisfactoriamente!");
})

// Click en los botones de acción dentro del carrito
items.addEventListener('click', e => {
    btnAccion(e)
})

// Agrega el producto seleccionado al carrito
const addCarrito = e => {
    if(e.target.classList.contains('btn-info')) {
        // Envia todo el elemento padre al carrito
        setCarrito(e.target.parentElement)
    }
    // Detiene cualquier otro evento que se pueda generar
    e.stopPropagation()
}

// Captura los elementos que fueron enviados por el método addCarrito()
const setCarrito = objecto => {
    const producto = {
        id: objecto.querySelector('.btn-info').dataset.id,
        title: objecto.querySelector('.card__text').textContent,
        precio: objecto.querySelector('.price__normal').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    pintarCarrito()
}

// Muestra los productos en la tabla
const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.precio
        templateCarrito.querySelectorAll('td')[2].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('.subtotal').textContent = (producto.cantidad * producto.precio).toFixed(2)
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)
    pintarFooter()
    localStorage.setItem('carrito', JSON.stringify(carrito))
    mostrarRealizarCompra()
}

const pintarFooter = () => {
    footer.innerHTML = ''
    // Si el carrito no contiene elementos
    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        // Hace que salga de la función
        return
    }

    // nCantidad = suma de todas las cantidades
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + (cantidad * precio), 0)
    
    templateFooter.querySelectorAll('td')[1].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio.toFixed(2)
    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}

const btnAccion = e => {
    // Acción aumentar
    if(e.target.classList.contains('btn-info')) {
        let producto = carrito[e.target.dataset.id]
        producto.cantidad++
        // carrito[e.target.dataset.id] = {...producto}
        producto = {...producto}
        pintarCarrito()
    }

    // Acción disminuir
    if(e.target.classList.contains('btn-danger')) {
        let producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }

    e.stopPropagation()
}

const mostrarRealizarCompra = () => {
    if(Object.keys(carrito).length === 0) {
        payments.style.display = 'none'
    } else {
        payments.style.display = 'block'
    }
}

const form = document.querySelector('.container-form')

const pagar = e => {
    swal({
        title: "¿Estas seguro de realizar la compra?",
        text: "Una vez procesado, ¡no podrá recuperar esta operación!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((toPay) => {
        if (toPay) {
            swal("!Se realizó con éxito la compra!", {
            icon: "success",
            });
            carrito = {}
            pintarCarrito()
            clearFields()
        }
        // location.href = "#" 
    });
    
    e.preventDefault()
}

form.addEventListener('submit', pagar)

const clearFields = () => {
    document.getElementsByName('card-number')[0].value = ""
    document.getElementsByName('name-owner')[0].value = ""
    document.getElementsByName('date')[0].value = ""
    document.getElementsByName('code')[0].value = ""
}








