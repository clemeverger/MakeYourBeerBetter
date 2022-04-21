let hops = {};
let malts = {};
let yeasts = {};

fetch("data/hops.json")
    .then(response => response.json())
    .then(data => hops = data)
    .then(() => console.log(hops))

fetch("data/malts.json")
    .then(response => response.json())
    .then(data => malts = data)
    .then(() => console.log(malts))

fetch("data/yeasts.json")
    .then(response => response.json())
    .then(data => yeasts = data)
    .then(() => console.log(yeasts))

class Slider {
    constructor(slider) {
        this.slider = document.querySelector(slider);

        this.activeTab = "hops";
        this.data = hops;

        let btn_container = document.createElement("div");
        btn_container.setAttribute("class", "btn_container");

        let filter_by_houblons = document.createElement("button");
        filter_by_houblons.innerHTML = "Houblons";
        filter_by_houblons.addEventListener("click", () => {
            this.updateData("hops");
        });

        let filter_by_malts = document.createElement("button");
        filter_by_malts.innerHTML = "Malts";
        filter_by_malts.addEventListener("click", () => {
            this.updateData("malts");
        });

        let filter_by_levures = document.createElement("button");
        filter_by_levures.innerHTML = "Levures";
        filter_by_levures.addEventListener("click", () => {
            this.updateData("yeasts");
        });

        btn_container.appendChild(filter_by_houblons);
        btn_container.appendChild(filter_by_malts);
        btn_container.appendChild(filter_by_levures);

        this.data_container = document.createElement("div");
        this.data_container.setAttribute("class", "data_container");

        this.slider.appendChild(btn_container);     
        this.slider.appendChild(this.data_container);    
    }

    updateData(e){
        this.activeTab = e;
        switch(this.activeTab){
            case "hops":
                this.data = hops;
                this.data_container.innerHTML = "";
            break;
            case "malts":
                this.data = malts;
                this.data_container.innerHTML = "";
            break;
            case "yeasts":
                this.data = yeasts;
                this.data_container.innerHTML = "";
            break;
        }
        this.data.data.forEach(elem => {
            let card = document.createElement("div");
            card.setAttribute("class", "card");
            card.innerHTML = elem.NAME;
            this.data_container.appendChild(card);
        });
    }
}

let activePage = "home";
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".menu__item").forEach((elem) => {
        elem.addEventListener("click", () => {
            document.querySelector("." + activePage).style.display = "none";
            activePage = elem.id;
            document.querySelector("." + activePage).style.display = "flex";
        })
    })
    let slider_inventory = new Slider(".slider");
});


