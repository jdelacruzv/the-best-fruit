// ---------------> MENU HAMBURGER --------------->

const btn_hamburger = document.querySelector('.btn-hamburger');
const menu = document.querySelector('.menu');
const menu_links = document.querySelectorAll('a.menu__link');

btn_hamburger.addEventListener('click', () => {
    btn_hamburger.classList.toggle('active');
    menu.classList.toggle('show');
});

// El menu desaparece cuando se hace click a cada enlace
menu_links.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('show');
        btn_hamburger.classList.toggle('active');
    });
});

// ---------------> MODAL CART --------------->

// const cart = document.getElementById('cart');
// const modal_cart = document.getElementById('modal-cart');
// const close_cart = document.getElementById('close-cart');
// const body = document.querySelector('body');

// cart.addEventListener('click', () => {
//     modal_cart.classList.add('show-modal');
//     body.style.overflow = 'hidden';
// });

// close_cart.addEventListener('click', () => {
//     modal_cart.classList.remove('show-modal');
//     body.style.overflow = 'visible';
// });

// ---------------> MODAL USER --------------->

const user = document.getElementById('user');
const modal_user = document.getElementById('modal-user');
const close_user = document.getElementById('close-user');

// user.addEventListener('click', () => {
//     modal_user.classList.add('show-modal');
// });

close_user.addEventListener('click', () => {
    modal_user.classList.remove('show-modal')
});

const tabs = document.querySelectorAll('[data-target]');
const content = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Recorre 'content' y al formulario que encuentre la clase 'active' lo elimina
        content.forEach(c => {
            c.classList.remove('active');
        });

        // Recorre la clase 'tab' y al menu que encuentre la clase 'focus' lo elimina
        tabs.forEach(t => {
            t.classList.remove('focus');
        });

        const t = document.querySelector(tab.dataset.target);
        tab.classList.add('focus');
        t.classList.add('active');
    })
});