import getData from './data-manager.js';
import Slider from './slider.js'
import getIngredient from './recipe.js'

let activePage = "home";
window.addEventListener("load", () => {
    document.querySelectorAll(".menu__item").forEach((elem) => {
        elem.addEventListener("click", () => {
            document.querySelector("." + activePage).style.display = "none";
            activePage = elem.id;
            document.querySelector("." + activePage).style.display = "flex";
        })
    })
    main();
});

async function main() {
    let settings = {
        "card": {
            "height": "55vh",
            "width": "20vw",
            "gap": "20px",
            "eWidth": "70vw",
            "eMargin": "10vw",
        },
        "selection": true
    };
    let slider = new Slider(".slider", await getData(), settings);

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains("btn-select")) {
            getIngredient(slider.getSelection())
        }
    })
}  