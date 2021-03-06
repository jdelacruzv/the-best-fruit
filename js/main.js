// ---------------> Efecto menu hamburguesa --------------->

let btn_hamburger = document.querySelector('.btn-hamburger');
let menu = document.querySelector('.menu');
let menu_links = document.querySelectorAll('a.menu__link');

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