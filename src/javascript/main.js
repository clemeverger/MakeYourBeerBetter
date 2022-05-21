import getData from './data-manager.js';
import Slider from './slider.js'

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
    let slider = new Slider(".slider", await getData());
    document.querySelectorAll('.btn-select').forEach(elem => {   
        elem.addEventListener('click', (e) => {
            console.log('selected id :', slider.activeCard.id);
        })
    })
}  