// Elementos del DOM
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");


const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    // Cambia el nombre de la variable a textElement
    for (const textElement of textsToChange) {
        
        const section = textElement.dataset.section;
        const value = textElement.dataset.value;

        // Usa textElement en lugar de textsToChange
        textElement.innerHTML=texts[section][value];

    }
    
};


// Cambiar el tema
const cambiarTema = () => {
    const temaActual = document.documentElement.getAttribute('data-theme');
    const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';
    document.documentElement.setAttribute('data-theme', nuevoTema);

    let icono = document.getElementById("iconoTema");
    icono.classList.toggle("fa-sun");
    icono.classList.toggle("fa-moon");
}

// Cambiar el idioma
const cambiarIdioma = () => {
    const boton = document.getElementById("textoIdioma");
    boton.innerHTML = boton.innerHTML === "ES" ? "EN" : "ES";
}

// Eventos
flagsElement.addEventListener("click", (e) => {
    changeLanguage(e.target.parentElement.dataset.language);
});

window.onscroll = () => {
    const scrollPosY = window.pageYOffset | document.body.scrollTop;
    const gradientValue = Math.min(0.5, scrollPosY/100);
    document.querySelector('.sidemenu').style.background = `linear-gradient(to bottom, rgba(0, 0, 0, ${gradientValue}), transparent)`;
}
