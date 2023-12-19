// Variables globales
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");

// Función para cambiar el idioma
const changeLanguage = async () => {
    let currentLanguage = document.getElementById("textoIdioma").innerText;
    let nextLanguage = currentLanguage === "ES" ? "en" : "es";

    try {
        const requestJson = await fetch(`./languages/${nextLanguage}.json`);

        if (requestJson.status !== 200) {
            throw new Error(`No se pudo cargar el archivo de idioma: ${requestJson.status}`);
        }

        const texts = await requestJson.json();

        for (const textElement of textsToChange) {
            const section = textElement.dataset.section;
            const value = textElement.dataset.value;
            textElement.textContent = texts[section][value];
        }

        document.getElementById("textoIdioma").textContent = nextLanguage === "es" ? "ES" : "EN";
    } catch (error) {
        console.error(`Error al cambiar el idioma:`, error);
    }
};



// Función para cambiar el tema
const cambiarTema = () => {
    let temaActual = document.documentElement.getAttribute('data-theme') || 'oscuro';
    const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';

    document.documentElement.setAttribute('data-theme', nuevoTema);

    let icono = document.getElementById("iconoTema");
    icono.classList.toggle("fa-sun");
    icono.classList.toggle("fa-moon");
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

document.querySelectorAll('.siguiente').forEach((el) => {
    el.addEventListener('click', () => {
        const nextSection = el.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Inicialización
window.onload = cambiarTema;
