const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");

// Cambiar el idioma
const changeLanguage = async () => {
    let currentLanguage = document.getElementById("textoIdioma").innerText; // Obtiene el idioma actual
    let nextLanguage; // Variable para almacenar el próximo idioma

    // Determina el próximo idioma en base al actual
    if (currentLanguage === "ES") {
      nextLanguage = "en";
    } else if (currentLanguage === "EN") {
      nextLanguage = "es";
    }

    // Realiza la misma lógica de carga de textos
    try {
        // Imprime la URL del archivo JSON
        console.log(`Petición realizada a: ./languages/${nextLanguage}.json`);

        // Inicializa la variable requestJson
        const requestJson = await fetch(`./languages/${nextLanguage}.json`);

        if (requestJson.status !== 200) {
            throw new Error(`No se pudo cargar el archivo de idioma: ${requestJson.status}`);
        }

        // Carga los textos del archivo JSON
        const texts = await requestJson.json();

        // Actualiza la página con los textos del nuevo idioma
        for (const textElement of textsToChange) {
            const section = textElement.dataset.section;
            const value = textElement.dataset.value;

            textElement.innerText = texts[section][value];
        }

        // Actualiza el texto del botón con el nuevo idioma
        const boton = document.getElementById("textoIdioma");
        boton.innerText = nextLanguage === "es" ? "ES" : "EN";
    } catch (error) {
        console.error(`Error al cambiar el idioma:`, error);
    }
  };

// Eventos
flagsElement.addEventListener("click", (e) => {
    changeLanguage(e.target.parentElement.dataset.language);
});

window.onscroll = () => {
    const scrollPosY = window.pageYOffset | document.body.scrollTop;
    const gradientValue = Math.min(0.5, scrollPosY/100);
    document.querySelector('.sidemenu').style.background = `linear-gradient(to bottom, rgba(0, 0, 0, ${gradientValue}), transparent)`;
}

// Cambiar el tema
const cambiarTema = () => {
    const temaActual = document.documentElement.getAttribute('data-theme');
    const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';
    document.documentElement.setAttribute('data-theme', nuevoTema);

    let icono = document.getElementById("iconoTema");
    icono.classList.toggle("fa-sun");
    icono.classList.toggle("fa-moon");
}