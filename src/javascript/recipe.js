
let ajoutElem = document.querySelector("#ajoutElem");
ajoutElem.addEventListener('click', function () {
    ajoutElem.style.display = "none";

    let table = document.querySelector('.table tbody');
    table.style.display = "block";

    let addIngredient = document.querySelector('#add-ingredients');
    addIngredient.style.display = "block";
})