const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    for (const textElement of textsToChange) {
        const section = textElement.dataset.section;
        const value = textElement.dataset.value;
        textElement.innerHTML = texts[section][value];
    }
}

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

  function cambiarTema() {
    const temaActual = document.documentElement.getAttribute('data-theme');
    const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';
    document.documentElement.setAttribute('data-theme', nuevoTema);
    let icono = document.getElementById("iconoTema");
    if (icono.classList.contains("fa-sun")) {
        icono.classList.remove("fa-sun");
        icono.classList.add("fa-moon");
    } else {
        icono.classList.remove("fa-moon");
        icono.classList.add("fa-sun");
    }
  }

  function cambiarIdioma() {
    var boton = document.getElementById("textoIdioma");
    if (boton.innerHTML === "ES") {
        boton.innerHTML = "EN";
    } else {
        boton.innerHTML = "ES";
    }
}