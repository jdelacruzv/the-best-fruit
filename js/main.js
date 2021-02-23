// ---------------> Efecto menu hamburguesa --------------->

let btn_menu = document.querySelector('.btn-menu');
let menu_items = document.querySelector('.menu-items');
let menu_links = document.querySelectorAll('a.menu-link');

btn_menu.addEventListener('click', () => {
    btn_menu.classList.toggle('active');
    menu_items.classList.toggle('show');
});

// El menu desaparece cuando se hace click a cada enlace
menu_links.forEach(link => {
    link.addEventListener('click', () => {
        menu_items.classList.remove('show');
        btn_menu.classList.toggle('active');
    });
});