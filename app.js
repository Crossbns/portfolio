// Elementos del DOM
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");

// Cambiar el idioma
const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    for (const textElement of textsToChange) {
        const section = textElement.dataset.section;
        const value = textElement.dataset.value;
        textElement.innerHTML = texts[section][value];
    }
}

// Cambiar el tema
function cambiarTema() {
    const temaActual = document.documentElement.getAttribute('data-theme');
    const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';
    document.documentElement.setAttribute('data-theme', nuevoTema);

    let icono = document.getElementById("iconoTema");
    icono.classList.toggle("fa-sun");
    icono.classList.toggle("fa-moon");
}

// Cambiar el idioma
function cambiarIdioma() {
    var boton = document.getElementById("textoIdioma");
    boton.innerHTML = boton.innerHTML === "ES" ? "EN" : "ES";
}

// Eventos
document.getElementById("flags").addEventListener("click", function() {
    let language = document.getElementById("flags").innerHTML;
    changeLanguage(language.toLowerCase());
});

flagsElement.addEventListener("click", (e) => {
    changeLanguage(e.target.parentElement.dataset.language);
});

window.onscroll = function() {
    var scrollPosY = window.pageYOffset | document.body.scrollTop;
    var gradientValue = Math.min(0.5, scrollPosY/100);
    document.querySelector('.sidemenu').style.background = `linear-gradient(to bottom, rgba(0, 0, 0, ${gradientValue}), transparent)`;
}
