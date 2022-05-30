let sliderData = {
    "hops": [
        {
            "NAME": "Agnus",
            "VERSION": "1",
            "ORIGIN": "Czech Republic",
            "ALPHA": "10.5000000",
            "AMOUNT": "0.0283495",
            "USE": "Boil",
            "TIME": "60.0000000",
            "NOTES": "Several large Czech breweries like Agnus as a bittering hop because its alpha/beta ratio is relatively high, which they believe makes their beer more stable. High geraniol level, oils indicate dry hopping potential.\nUsed for: Ales\nAroma: Strong hop aroma, spicy\nSubstitutions: Unknown\nStorage: Unknown\n9-15% AA / 4-8% Beta",
            "TYPE": "Bittering",
            "FORM": "Pellet",
            "BETA": "5.2500000",
            "HSI": "15.0000000",
            "DISPLAY_AMOUNT": "28.3 g",
            "INVENTORY": "2000.0 g",
            "DISPLAY_TIME": "60.0 min",
            "MASSE": "120",
            "TIME": "60"
        },
        {
            "NAME": "Ahtanum",
            "VERSION": "1",
            "ORIGIN": "U.S.",
            "ALPHA": "6.0000000",
            "AMOUNT": "0.0000000",
            "USE": "Boil",
            "TIME": "0.0000000",
            "NOTES": "Distinctive aromatic hops with moderate bittering power from Washington.\nUsed for: American ales and lagers\nAroma: Distinctive floral and citrus aromas\nSubstitutes: Amarillo, Cascade",
            "TYPE": "Aroma",
            "FORM": "Pellet",
            "BETA": "5.2500000",
            "HSI": "30.0000000",
            "DISPLAY_AMOUNT": "0.0 g",
            "INVENTORY": "2000.0 g",
            "DISPLAY_TIME": "0.0 min",
            "MASSE": "580",
            "TIME": "20"
        },
    ],
    "malts": [
        {
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
            "EXTRACT_SUBSTITUTE": "Pale Liquid Extract",
            "MASSE": "35"
        },
        {
            "NAME": "Amber Dry Extract",
            "VERSION": "1",
            "TYPE": "Dry Extract",
            "AMOUNT": "0.0000000",
            "YIELD": "95.0000000",
            "COLOR": "12.5000000",
            "ADD_AFTER_BOIL": "FALSE",
            "ORIGIN": "US",
            "SUPPLIER": "",
            "NOTES": "Amber colored dry malt extract, for general purpose use.\nUse in any medium to dark colored beer.\nExamples: Ales, Marzens, Amber Ale, India Pale Ale",
            "COARSE_FINE_DIFF": "1.5000000",
            "MOISTURE": "4.0000000",
            "DIASTATIC_POWER": "120.0000000",
            "PROTEIN": "11.7000000",
            "MAX_IN_BATCH": "100.0000000",
            "RECOMMEND_MASH": "FALSE",
            "IBU_GAL_PER_LB": "0.0000000",
            "DISPLAY_AMOUNT": "0.0 kg",
            "INVENTORY": "100.0 kg",
            "POTENTIAL": "1.0437000",
            "DISPLAY_COLOR": "24.6 EBC",
            "EXTRACT_SUBSTITUTE": "",
            "MASSE": "60"
        },
    ],
    "yeasts": [
        {
            "NAME": "Abbey Ale C",
            "VERSION": "1",
            "TYPE": "Ale",
            "FORM": "Liquid",
            "AMOUNT": "0.0000000",
            "AMOUNT_IS_WEIGHT": "FALSE",
            "LABORATORY": "Omega",
            "PRODUCT_ID": "OYL-018",
            "MIN_TEMPERATURE": "20.0000000",
            "MAX_TEMPERATURE": "25.5555556",
            "FLOCCULATION": "Medium",
            "ATTENUATION": "76.0000000",
            "NOTES": "From a famous Trappist brewery, this yeast produces the distinctive fruitiness and plum characteristics. Excellent yeast for high gravity beers, Belgian ales, dubbels and trippels.",
            "BEST_FOR": "Belgian Ales, Abbey Ales, Trappist Ales",
            "MAX_REUSE": "5",
            "TIMES_CULTURED": "0",
            "ADD_TO_SECONDARY": "FALSE",
            "DISPLAY_AMOUNT": "0.0 ml",
            "DISP_MIN_TEMP": "20.0 C",
            "DISP_MAX_TEMP": "25.6 C",
            "INVENTORY": "50.0 pkg",
            "CULTURE_DATE": "03 Feb 2016"
        },
    ],
}
let table = document.querySelector('.table tbody');
// let ajoutElem = document.querySelector("#ajoutElem");

// Déclaration des différents input de résultat des calculs
let totalMaltRecipe = document.querySelector('.resultCalc .totalMalts span');
let totalHopsRecipe = document.querySelector('.resultCalc .totalHops span');
let DORecipe = document.querySelector('.resultCalc .DO span');
let DFRecipe = document.querySelector('.resultCalc .DF span');
let IBURecipe = document.querySelector('.resultCalc .IBU span');
let EBCRecipe = document.querySelector('.resultCalc .EBC span');
let ABVRecipe = document.querySelector('.resultCalc .ABV span');

let userInput = {
    "beerName": "",
    "volume": "",
    "boil": "",
    "efficiency": ""
};

let steps = [
     'Moût',
     'Pré-ébullition',
     'Ébullition',
     'Whirlpool',
     'Dryhop'
]

document.addEventListener("DOMContentLoaded", () => {
    getUserInputs();
})


// ajoutElem.addEventListener('click', function () {
//     //this.style.display = "none";
//     table.style.display = "block";
//     //addIngredient.style.display = "block";

//     totalMaltRecipe.innerHTML = somme("malts", "MASSE") + " Kgs";
//     totalHopsRecipe.innerHTML = somme("hops", "MASSE") + " Grs";
//     DORecipe.innerHTML = calculDO().toFixed(3);
//     DFRecipe.innerHTML = calculDF().toFixed(3);
//     IBURecipe.innerHTML = calculIBU();
//     EBCRecipe.innerHTML = Math.round(calculEBC());
//     ABVRecipe.innerHTML = calculABV().toFixed(1) + " %";
// })


////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// FUNCTION //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function getUserInputs()// Récupère la valeur des input (nom, volume, ébulition ,efficacité)
{
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
        });
    });
}
//////////////////////////////// Calcul //////////////////////////////////////

function somme(typeName, info) // Retourne les infos de sliderData typeName => nom de l'ingredient & info => l'info de l'ingredient
{
    let data = sliderData;
    let elementName = "";

    switch (typeName) {
        case "malts": elementName = data.malts;
            break;
        case "hops": elementName = data.hops;
            break;
        case "yeasts": elementName = data.yeasts;
            break;
    };
    let infoSlider = [];
    elementName.forEach(function (elem) {
        infoSlider.push(elem[info]);
    });

    let total = 0;
    infoSlider.forEach(element => {
        total += parseFloat(element);
    });
    return total;
}

function qtSucre(masseGrain, potentielGrain, efficacite) // Calcul De la quantité de sucre pour chaque Malts (Kg)
{
    return masseGrain * (potentielGrain / 100) * (efficacite / 100);
}

function calculDO() // Calcul de la densité originelle du moût
{
    let totalSucre = 0;
    sliderData.malts.forEach(e => {
        totalSucre += qtSucre(e.MASSE, e.YIELD, userInput.efficiency);
    });

    let DO = 1 + (383 * totalSucre / userInput.volume) / 1000;
    return DO;
}

function calculDF() // Calcul de la densité finale
{
    let attenuation = somme("yeasts", "ATTENUATION");

    return 1 + (((calculDO() * 1000 - 1000) * (1 - attenuation / 100)) / 1000)
}

function calculABV() // Calcul du taux d'alcool (%)
{
    return (calculDO() * 1000 - calculDF() * 1000) / 7.6
}

function calculIBUs(duree, volume, masseHoublon, totalAlpha) // 
{
    return [1.65 * Math.pow(0.000125, calculDO() / 1000)] * [(1 - Math.pow(2.718281828459045235, (-0.04 * duree))) / 4.15] * (totalAlpha / 10 * masseHoublon * 74.90) / volume;
}

function calculIBU() // Calcul de l'amertume ()
{
    let IBUs = 0;
    sliderData.hops.forEach(e => {
        IBUs += calculIBUs(e.TIME, userInput.volume, e.MASSE, e.ALPHA);
    });

    return Math.round(IBUs * 10) / 10;
}

function calculMCU(EBC, masseMalts, volume) // Calcul de l'apport en EBC de chaque malts
{
    return 4.24 * EBC * masseMalts / volume;
}

function calculEBC() // Calcul de la couleur
{
    let MCU = 0;
    sliderData.malts.forEach(e => {
        MCU += calculMCU(e.DISPLAY_COLOR.replace('EBC', ''), e.MASSE, userInput.volume);
    });
    return 2.94 * Math.pow(MCU, 0.6859);
}

////////


if (document.querySelector('.table tr .elem')) {
    document.querySelector('.table').style.display = "block";
    document.querySelector('.resultCalc').style.display = "block";
}

// Tab qui contient tous les ingrédients ajoutés
let currentIngredients = [];

//Tab qui contient tous les ingrédients validés (soit après avoir rentré les quantités etc)
let recipeIngredients = [];

export default function getIngredient(ing) {
    currentIngredients.push({ type: ing.type, data: ing.data })
    console.log({ currentIngredient: currentIngredients })


    table.style.display = "block";


    var row = table.insertRow(0);
    // Insert new cells (<td> elements)
    let cellName = row.insertCell(0);
    let cellType = row.insertCell(1);
    let cellQuantite = row.insertCell(2);
    let cellEtape = row.insertCell(3);
    let cellTemps = row.insertCell(4);
    let cellValider = row.insertCell(5);
    let cellAnnuler = row.insertCell(6);

    //Creation d'un id pour l'ingrédient
    let id = Date.now()


    // Add some content to the new cells:
    cellName.innerHTML = ing.data.NAME;
    cellType.innerHTML = ing.type;
    cellQuantite.innerHTML = `<input type="number" id="${'qty'+id}" name="quantite" step=10>`
    cellEtape.innerHTML = `<select  id="${'step'+id}" name="etape">
    <option value="${steps[0]}">${steps[0]}</option>
    <option value="${steps[1]}">${steps[1]}</option>
    <option value="${steps[2]}">${steps[2]}</option>
    <option value="${steps[3]}">${steps[3]}</option>
    <option value="${steps[4]}">${steps[4]}</option>
    </select>
    `
    cellTemps.innerHTML = `<input type="number" id="${'tmp'+id}" name="temps" step=5>`
    cellValider.innerHTML = `<button id="${'val'+id}">Valider</button>`
    cellAnnuler.innerHTML = `<button id="${'can'+id}">Annuler</button>`


    // To watch elements further
    let inputStep = document.getElementById('step'+id)
    let inputTmp = document.getElementById('tmp'+id)
    let inputQty = document.getElementById('qty'+id)
    let buttonVal = document.getElementById('val'+id)
    let buttonCancel = document.getElementById('can'+id)


    // event listeners
    buttonVal.addEventListener('click', () => {
       if(addToRecipe(ing, id, inputStep.value, inputTmp.value, inputQty.value)){
        buttonVal.remove()
       }
    })
    buttonCancel.addEventListener('click', () => {
        recipeIngredients = removeFromRecipe(id)
        table.deleteRow(0)
        console.log({recipeIngredients})
    })
}

function addToRecipe(ing, id, step, tmp, qty) {
    if (!step || !tmp || !qty) {
        window.alert("Vous n'avez pas rempli tous les champs !")
        return false
    } else {
        recipeIngredients.push({...ing, id, step, tmp, qty})
        console.log({recipeIngredients})
        return true
    }

   
}

function removeFromRecipe(id) {
    return recipeIngredients.filter(function(ing){ 
        return ing.id != id; 
    });
}