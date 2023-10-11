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

flagsElement.addEventListener("click", (e) => {
    changeLanguage(e.target.parentElement.dataset.language);
});
