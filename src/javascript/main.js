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
    document.addEventListener('click',(e) => {
        if(e.target.classList.contains("btn-select")){
            console.log(slider.getSelection());
        }
    })
}  