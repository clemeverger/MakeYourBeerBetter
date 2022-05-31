let table = document.querySelector('.table tbody');

// Déclaration des différents input de résultat des calculs
let totalMaltRecipe = document.querySelector('.resultCalc .totalMalts span');
let totalHopsRecipe = document.querySelector('.resultCalc .totalHops span');
let DORecipe = document.querySelector('.resultCalc .DO span');
let DFRecipe = document.querySelector('.resultCalc .DF span');
let IBURecipe = document.querySelector('.resultCalc .IBU span');
let EBCRecipe = document.querySelector('.resultCalc .EBC span');
let ABVRecipe = document.querySelector('.resultCalc .ABV span');

let totalMalts = document.getElementById('totalMalts')
let totalHops = document.getElementById('totalHops')
let originalDensity = document.getElementById('DO')
let finalDensity = document.getElementById('DF')
let bitterness = document.getElementById('IBU')
let color = document.getElementById('EBC')
let alcohol = document.getElementById('ABV')

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



////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// FUNCTION //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function getUserInputs() // Récupère la valeur des input (nom, volume, ébulition ,efficacité)
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

function qtSucre(masseGrain, potentielGrain, efficacite) // Calcul De la quantité de sucre pour chaque Malts (Kg)
{
    return masseGrain * (potentielGrain / 100) * (efficacite / 100);
}

function calculDO(malts) // Calcul de la densité originelle du moût // PARAM : tableau de malts
{
    console.log({ malts })

    let totalSucre = 0;
    malts.forEach(malt => {
        totalSucre += qtSucre(malt.qty, malt.data.YIELD, userInput.efficiency);
    });

    let DO = 1 + (383 * totalSucre / userInput.volume) / 1000;
    return DO;
}

function calculDF() // Calcul de la densité finale
{
    let attenuation = getYeastsAttenuation()

    return 1 + (((calculDO(getAllMalts()) * 1000 - 1000) * (1 - attenuation / 100)) / 1000)
}

function calculABV() // Calcul du taux d'alcool (%)
{
    return (calculDO(getAllMalts()) * 1000 - calculDF() * 1000) / 7.6
}

function calculIBUs(duree, volume, masseHoublon, totalAlpha) // 
{
    return [1.65 * Math.pow(0.000125, calculDO(getAllMalts()) / 1000)] * [(1 - Math.pow(2.718281828459045235, (-0.04 * duree))) / 4.15] * (totalAlpha / 10 * masseHoublon * 74.90) / volume;
}

function calculIBU(hops) // Calcul de l'amertume () // envoyer en param un array des hops choisis
{
    let IBUs = 0;
    hops.forEach(hop => {
        IBUs += calculIBUs(hop.data.TIME, userInput.volume, hop.qty, hop.data.ALPHA);
    });

    return Math.round(IBUs * 10) / 10;
}

function calculMCU(EBC, masseMalts, volume) // Calcul de l'apport en EBC de chaque malts
{
    return 4.24 * EBC * masseMalts / volume;
}

function calculEBC(malts) // Calcul de la couleur // envoyer en param un array des malts choisis
{
    let MCU = 0;
    malts.forEach(malt => {
        MCU += calculMCU(malt.data.DISPLAY_COLOR.replace('EBC', ''), malt.qty, userInput.volume);
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
    cellQuantite.innerHTML = `<input type="number" id="${'qty' + id}" name="quantite" step=10>`
    cellEtape.innerHTML = `<select  id="${'step' + id}" name="etape">
    <option value="${steps[0]}">${steps[0]}</option>
    <option value="${steps[1]}">${steps[1]}</option>
    <option value="${steps[2]}">${steps[2]}</option>
    <option value="${steps[3]}">${steps[3]}</option>
    <option value="${steps[4]}">${steps[4]}</option>
    </select>
    `
    cellTemps.innerHTML = `<input type="number" id="${'tmp' + id}" name="temps" step=5>`
    cellValider.innerHTML = `<button id="${'val' + id}">Valider</button>`
    cellAnnuler.innerHTML = `<button id="${'can' + id}">Annuler</button>`


    // To watch elements further
    let inputStep = document.getElementById('step' + id)
    let inputTmp = document.getElementById('tmp' + id)
    let inputQty = document.getElementById('qty' + id)
    let buttonVal = document.getElementById('val' + id)
    let buttonCancel = document.getElementById('can' + id)


    // event listeners
    buttonVal.addEventListener('click', () => {
        if (addToRecipe(ing, id, inputStep.value, inputTmp.value, inputQty.value)) {
            buttonVal.remove()
        }
    })
    buttonCancel.addEventListener('click', () => {
        recipeIngredients = removeFromRecipe(id)
        table.deleteRow(0)
        console.log({ recipeIngredients })
    })
}

function addToRecipe(ing, id, step, tmp, qty) {
    if (!step || !tmp || !qty) {
        window.alert("Vous n'avez pas rempli tous les champs !")
        return false
    } else {
        if (isOneOfEachInIt()) {
            recipeIngredients.push({ ...ing, id, step, tmp, qty })
            renderBeerStats()
            return true
        } else {
            recipeIngredients.push({ ...ing, id, step, tmp, qty })
            return true
        }


    }


}

function removeFromRecipe(id) {
    return recipeIngredients.filter(function (ing) {
        return ing.id != id;
    });
}

function renderBeerStats() {


    totalMalts.innerHTML = getMaltsMass() + "g"
    totalHops.innerHTML = getHopsMass() + "g"
    finalDensity.innerHTML = calculDF().toFixed(2)
    originalDensity.innerHTML = calculDO(getAllMalts()).toFixed(2)
    bitterness.innerHTML = calculIBU(getAllHops())
    color.innerHTML = calculEBC(getAllMalts()).toFixed(2)
    alcohol.innerHTML = calculABV().toFixed(2) + "°"// calculABV
    document.querySelector('#beforeBeer').classList.add('ebc-' + Math.round(calculEBC(getAllMalts())) + '');

}

function resetBeerStats() {
    totalMalts.innerHTML = ''
    totalHops.innerHTML = ''
    originalDensity.innerHTML = ''
    finalDensity.innerHTML = ''
    bitterness.innerHTML = ''
    color.innerHTML = ''
    alcohol.innerHTML = ''
}

function getAllMalts() {
    console.log('sending allMalts : ', recipeIngredients.filter(ing => ing.type === 'malts'))
    return recipeIngredients.filter(ing => ing.type === 'malts')
}

function getAllHops() {
    return recipeIngredients.filter(ing => ing.type === 'hops')
}

function getAllYeasts() {
    return recipeIngredients.filter(ing => ing.type === 'yeasts')
}

function getYeastsAttenuation() {
    let sum = 0;
    getAllYeasts().forEach(yeast => {
        sum += parseFloat(yeast.data.ATTENUATION)
    })
    return sum
}

function getMaltsMass() {
    let sum = 0;
    getAllMalts().forEach(malt => {
        sum += parseFloat(malt.qty)
    })
    return sum
}

function getHopsMass() {
    let sum = 0;
    getAllHops().forEach(hop => {
        sum += parseFloat(hop.qty)
    })
    return sum
}

function isOneOfEachInIt() {
    return recipeIngredients.some(ing => ing.type === 'hops') && recipeIngredients.some(ing => ing.type === 'malts') && recipeIngredients.some(ing => ing.type === 'yeasts')
}