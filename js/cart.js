class Carrito {
    //Agrega producto al carrito
    comprarProducto(e) {
        e.preventDefault();
        //Delegado para agregar al carrito
        if(e.target.classList.contains('add-cart')) {
            const producto = e.target.parentElement.parentElement;
            //Enviamos el producto seleccionado para tomar sus datos
            this.leerDatosProducto(producto);
        }
    }

    //Leer datos del producto
    leerDatosProducto(producto) {
        const infoProducto = {
            titulo: producto.querySelector('p.card__text').textContent,
            precio: producto.querySelector('p.coin span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }

        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(productoLS => {
            if(productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            }
        });

        if(productosLS === infoProducto.id) {
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El producto ya está agregado',
                showConfirmButton: false,
                timer: 1000
            })
        }
        else {
            this.guardarProductosLocalStorage(infoProducto);
            Swal.fire({
                type: 'info',
                title: 'Good...',
                text: 'El producto se agrego correctamente',
                showConfirmButton: false,
                timer: 1000
            })
        }
    }

    //Comprobar si hay elementos en el LS
    obtenerProductosLocalStorage() {
        let productoLS;
        //Comprobar si hay algo en LS
        if(localStorage.getItem('productos') === null) {
            productoLS = [];
        }
        else {
            //Traemos lo que hay en LS en formato objeto con: JSON.parse
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    //Almacenar en el LS
    guardarProductosLocalStorage(producto){
        let productos;
        //Toma valor de un arreglo con datos del LS
        productos = this.obtenerProductosLocalStorage();
        //Agregar el producto al carrito
        productos.push(producto);
        //Agregamos al LS en formato texto con: JSON.stringify
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //Eliminar producto por ID del LS
    eliminarProductoLocalStorage(productoID){
        let productosLS;
        //Obtenemos el arreglo de productos
        productosLS = this.obtenerProductosLocalStorage();
        //Comparar el id del producto borrado con LS
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        //Añadimos el arreglo actual al LS
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //Mostrar los productos guardados en el LS en compra.html
    leerLocalStorageCompra() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>${producto.precio * producto.cantidad}</td>
                <td>
                    <img src="/img/close.png" class="close" style="width:40px" data-id="${producto.id}"></img>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    //Eliminar producto por ID del LS
    eliminarProductoLocalStorage(productoID){
        let productosLS;
        //Obtenemos el arreglo de productos
        productosLS = this.obtenerProductosLocalStorage();
        //Comparar el id del producto borrado con LS
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        //Añadimos el arreglo actual al LS
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //Eliminar todos los datos del LS
    vaciarLocalStorage(){
        localStorage.clear();
    }

    //Procesar pedido
    procesarPedido(e){
        e.preventDefault();
        if(this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El carrito está vacío, agrega algún producto',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else {
            location.href = "shopping.html";
        }
    }

    //Calcular montos
    calcularTotal() {
        let productosLS;
        let total = 0, iva = 0, subtotal = 0;
        productosLS = this.obtenerProductosLocalStorage();
        for(let i=0; i<productosLS.length; i++){
            let element = Number(productosLS[i].precio * productosLS[i].cantidad);
            total = total + element;
        }
        
        iva = parseFloat(total * 0.19).toFixed(2);
        subtotal = parseFloat(total - iva).toFixed(2);

        document.getElementById('subtotal').innerHTML = "$ " + subtotal;
        document.getElementById('iva').innerHTML = "$ " + iva;
        document.getElementById('total').value = "$ " + total.toFixed(2);
    }

    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            // id = producto.querySelector('a').getAttribute('data-id');
            id='1';
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
        }
        else {
            console.log("click afuera");
        }
    }
}

