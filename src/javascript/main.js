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
            this.activeTab = "hops";
            console.log("filter by houblons", this.data);
        });

        let filter_by_malts = document.createElement("button");
        filter_by_malts.innerHTML = "Malts";
        filter_by_malts.addEventListener("click", () => {
            this.activeTab = "malts";
            this.data = malts;
            console.log("filter by malts", this.data);
        });

        let filter_by_levures = document.createElement("button");
        filter_by_levures.innerHTML = "Levures";
        filter_by_levures.addEventListener("click", () => {
            this.activeTab = "yeasts";
            this.data = yeasts;
            console.log("filter by levures", this.data);
        });

        btn_container.appendChild(filter_by_houblons);
        btn_container.appendChild(filter_by_malts);
        btn_container.appendChild(filter_by_levures);
        this.slider.appendChild(btn_container);      
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
});


