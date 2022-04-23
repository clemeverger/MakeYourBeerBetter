export default class Slider {
    constructor(slider, JSON_DATA) {
        this.slider = document.querySelector(slider);
        this.JSON_DATA = JSON_DATA;

        this.activeTab = "hops";
        this.activeData = this.JSON_DATA.hops;

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
                this.activeData = this.JSON_DATA.hops;
                this.data_container.innerHTML = "";
            break;
            case "malts":
                this.activeData = this.JSON_DATA.malts;
                this.data_container.innerHTML = "";
            break;
            case "yeasts":
                this.activeData = this.JSON_DATA.yeasts;
                this.data_container.innerHTML = "";
            break;
        }
        this.activeData.forEach(elem => {
            let card = document.createElement("div");
            card.setAttribute("class", "card");
            card.innerHTML = elem.NAME;
            this.data_container.appendChild(card);
        });
    }
}