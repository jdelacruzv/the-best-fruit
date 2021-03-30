// ---------------> MENU HAMBURGER --------------->

const btn_hamburger = document.querySelector('.btn-hamburger');
const menu = document.querySelector('.menu');
const menu_links = document.querySelectorAll('.menu__link');

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