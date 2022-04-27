let sliderData = {
    hops: {
        "NAME": "Admiral",
        "VERSION": "1",
        "ORIGIN": "United Kingdom",
        "ALPHA": "14.7500000",
        "AMOUNT": "0.0000000",
        "USE": "Boil",
        "TIME": "0.0000000",
        "NOTES": "Bittering hops derived from Wye Challenger.  Good high-alpha bittering hops.\nUsed for: Ales\nAroma: Primarily for bittering\nSubstitutes: Target, Northdown, Challenger",
        "TYPE": "Bittering",
        "FORM": "Pellet",
        "BETA": "5.6000000",
        "HSI": "15.0000000",
        "DISPLAY_AMOUNT": "0.0 g",
        "INVENTORY": "2000.0 g",
        "DISPLAY_TIME": "0.0 min"
    },
    malts: {
        "NAME": "Acid Malt",
        "VERSION": "1",
        "TYPE": "Grain",
        "AMOUNT": "0.0000000",
        "YIELD": "58.7000000",
        "COLOR": "3.0000000",
        "ADD_AFTER_BOIL": "FALSE",
        "ORIGIN": "Germany",
        "SUPPLIER": "",
        "NOTES": "Acid malt contains acids from natural lactic acids.  Used by German brewers to adjust malt PH without chemicals to adhere to German purity laws.  Also enhances the head retention.",
        "COARSE_FINE_DIFF": "1.5000000",
        "MOISTURE": "4.0000000",
        "DIASTATIC_POWER": "0.0000000",
        "PROTEIN": "6.0000000",
        "MAX_IN_BATCH": "10.0000000",
        "RECOMMEND_MASH": "TRUE",
        "IBU_GAL_PER_LB": "0.0000000",
        "DISPLAY_AMOUNT": "0.0 kg",
        "INVENTORY": "100.0 kg",
        "POTENTIAL": "1.0270020",
        "DISPLAY_COLOR": "5.9 EBC",
        "EXTRACT_SUBSTITUTE": "Pale Liquid Extract"
    },
    yeasts: {
        "NAME": "Abbaye Belgian",
        "VERSION": "1",
        "TYPE": "Ale",
        "FORM": "Dry",
        "AMOUNT": "0.0000000",
        "AMOUNT_IS_WEIGHT": "FALSE",
        "LABORATORY": "Lallemand/Danstar",
        "PRODUCT_ID": "-",
        "MIN_TEMPERATURE": "17.0000000",
        "MAX_TEMPERATURE": "22.2222222",
        "FLOCCULATION": "Low",
        "ATTENUATION": "72.0000000",
        "NOTES": "Complex aroma and flavors may include peppery, fruity, banana,\nclovy, alcoholic, sweet and fruity. Does not display undesirable odors\nwhen properly handled.",
        "BEST_FOR": "Belgian Ales",
        "MAX_REUSE": "5",
        "TIMES_CULTURED": "0",
        "ADD_TO_SECONDARY": "FALSE",
        "DISPLAY_AMOUNT": "0.0 ml",
        "DISP_MIN_TEMP": "17.0 C",
        "DISP_MAX_TEMP": "22.2 C",
        "INVENTORY": "50.0 pkg",
        "CULTURE_DATE": "20 Jan 2016"
    },
}

let table = document.querySelector('.table tbody');
let addIngredient = document.querySelector('#add-ingredients');
let ajoutElem = document.querySelector("#ajoutElem");

let userInput = {
    "beerName": "",
    "volume": "",
    "boil": "",
    "efficiency": ""
};

// MAIN
document.addEventListener("DOMContentLoaded", () => {
    getUserInputs();
})

function getUserInputs() {
    document.querySelectorAll('.recipe input').forEach(input => {
        input.addEventListener('change', (e) => {
            switch (e.target.id) {
                case "beerName": userInput.beerName = e.target.value;
                    break;
                case "volume": userInput.volume = e.target.value;
                    break;
                case "boil": userInput.boil = e.target.value;
                    break;
                case "efficiency": userInput.efficiency = e.target.value;
                    break;
            };
            console.table(userInput);
        });
    });
}

function Qtsucre(masseGrain, potentielGrain, efficacite) {
    return E = masseGrain * (potentielGrain / 100) * (efficacite / 100);
}

function calculOG(volBrassin) {
    let total = 0;
    sliderData.forEach(element => {
        total += Qtsucre(element);
    });
    return DO = 1 + (383 * (total) / volBrassin) / 1000
}

// ajoutElem.addEventListener('click', function () {
//     this.style.display = "none";
//     table.style.display = "block";
//     addIngredient.style.display = "block";

//     // Create an empty <tr> element
//     var row = table.insertRow(0);

//     // Insert new cells (<td> elements)
//     let cellName = row.insertCell(0);
//     let cellType = row.insertCell(1);
//     let cellQuantite = row.insertCell(2);
//     let cellEtape = row.insertCell(3);
//     let cellTemps = row.insertCell(4);

//     // Add some text to the new cells:
//     cellName.innerHTML = sliderData.malts.NAME;
//     cellType.innerHTML = sliderData.malts.TYPE;
//     cellQuantite.innerHTML = "12 kgs";
//     cellEtape.innerHTML = "Empatage";
//     cellTemps.innerHTML = "---";
// })

// addIngredient.addEventListener('click', function () {
//     // Create an empty <tr> element
//     let row = table.insertRow(1);

//     // Insert new cells (<td> elements)
//     let cellName = row.insertCell(0);
//     let cellType = row.insertCell(1);
//     let cellQuantite = row.insertCell(2);
//     let cellEtape = row.insertCell(3);
//     let cellTemps = row.insertCell(4);

//     // Add some text to the new cells:
//     cellName.innerHTML = sliderData.hops.NAME;
//     cellType.innerHTML = sliderData.hops.TYPE;
//     cellQuantite.innerHTML = "140 grs";
//     cellEtape.innerHTML = "Empatage";
//     cellTemps.innerHTML = "---";


//     // Create an empty <tr> element
//     let row1 = table.insertRow(1);

//     // Insert new cells (<td> elements)
//     let cellName = row1.insertCell(0);
//     let cellType = row1.insertCell(1);
//     let cellQuantite = row1.insertCell(2);
//     let cellEtape = row1.insertCell(3);
//     let cellTemps = row1.insertCell(4);

//     // Add some text to the new cells:
//     cellName.innerHTML = sliderData.yeasts.NAME;
//     cellType.innerHTML = sliderData.yeasts.TYPE;
//     cellQuantite.innerHTML = "100 ml";
//     cellEtape.innerHTML = "---";
//     cellTemps.innerHTML = "---";
// })

// declaration 
