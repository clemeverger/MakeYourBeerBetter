export default class Slider {
    constructor(destination, data, settings) {
        //CUSTOM SETTINGS
        if (this.settings) {
            this.settings = settings;
        }
        else {
            //DEFAULT SETTINGS
            this.settings = {
                "card": {
                    "height": "50vh",
                    "width": "20vw",
                    "eWidth": "70vw",
                    "gap": "20px",
                }
            }
        }
        this.slider = document.querySelector(destination);
        this.data = data;

        this.activeData = this.data.hops;

        this.activeCard = undefined;
        this.sliderPosition = 0;

        this.openningCardsIsLocked = false;

        this.createSlider();
        this.updateData();
    }
    createSlider() {
        let filter = document.createElement("div");
        filter.setAttribute("class", "slider-filter");

        let filter_by_houblons = document.createElement("button");
        filter_by_houblons.innerHTML = "Houblons";
        filter_by_houblons.addEventListener("click", () => {
            this.filterData("hops");
        });

        let filter_by_malts = document.createElement("button");
        filter_by_malts.innerHTML = "Malts";
        filter_by_malts.addEventListener("click", () => {
            this.filterData("malts");
        });

        let filter_by_levures = document.createElement("button");
        filter_by_levures.innerHTML = "Levures";
        filter_by_levures.addEventListener("click", () => {
            this.filterData("yeasts");
        });

        filter.appendChild(filter_by_houblons);
        filter.appendChild(filter_by_malts);
        filter.appendChild(filter_by_levures);

        this.data_container = document.createElement("div");
        this.data_container.setAttribute("class", "slider-data_container");
        this.data_container.style.gap = this.settings.card.gap;


        this.sliding_container = document.createElement("div");
        this.sliding_container.classList.add("slider-sliding_container");
        this.sliding_container.appendChild(this.data_container);

        this.slider.appendChild(filter);
        this.slider.appendChild(this.sliding_container);

        this.initSlider();
    }
    initSlider() {
        let clientX = null;
        let grabbing = false;
        let prevDistanceScrolled = null;
        let distanceToScroll;

        let temp = 0;

        this.sliding_container.addEventListener("mousedown", (e) => {
            clientX = e.clientX;
            grabbing = true;
        })

        this.sliding_container.addEventListener("mouseup", () => {
            grabbing = false;
            if (distanceToScroll != temp) {
                prevDistanceScrolled += distanceToScroll;
                temp = distanceToScroll;
                setTimeout(() => {
                    this.openningCardsIsLocked = false;
                }, 10);
            }
            else {
                console.log("ERROR");
            }
        })

        this.sliding_container.addEventListener("mousemove", (e) => {
            if (grabbing) {
                this.openningCardsIsLocked = true;
                let newClientX = e.clientX;
                distanceToScroll = newClientX - clientX;
                let offset = distanceToScroll + prevDistanceScrolled;
                gsap.to(this.sliding_container, { x: offset });
            }
        })
    }
    filterData(by) {
        switch (by) {
            case "hops":
                this.activeData = this.data.hops;
                this.data_container.innerHTML = "";
                break;
            case "malts":
                this.activeData = this.data.malts;
                this.data_container.innerHTML = "";
                break;
            case "yeasts":
                this.activeData = this.data.yeasts;
                this.data_container.innerHTML = "";
                break;
        }
        this.updateData();
    }
    updateData() {
        this.activeData.forEach(elem => {
            let card = document.createElement("div");
            card.setAttribute("class", "slider-card");

            card.style.width = this.settings.card.width;
            card.style.height = this.settings.card.height;

            card.id = elem.NAME;

            let content_collapsed = document.createElement("div");
            content_collapsed.setAttribute("class", "slider-content--collapsed");
            content_collapsed.innerHTML = `
            <div>` + elem.NAME + `</div>
            <div>` + elem.ORIGIN + `</div>
            <div>` + elem.TYPE + `</div>
            <div>` + elem.INVENTORY + `</div>
            `;

            let content_expanded = document.createElement("div");
            content_expanded.setAttribute("class", "slider-content--expanded");
            content_expanded.innerHTML = `
            <h3>` + elem.NAME + `</h3>
            <div>` + elem.ORIGIN + `</div>
            <div>` + elem.TYPE + `</div>
            <div>` + elem.INVENTORY + `</div>
            `;

            card.appendChild(content_collapsed);
            card.appendChild(content_expanded);

            card.addEventListener("click", (e) => {
                if (!this.openningCardsIsLocked) {
                    this.expandTheCard(e);
                }
            })
            this.data_container.appendChild(card);
        });
    }
    expandTheCard(e) {
        let powerNumber = 4;
        if (e.target != this.activeCard) {
            this.activeCard = e.target;
            gsap.to(this.activeCard, { width: this.settings.card.eWidth, marginLeft: "200px", marginRight: "200px", ease: 'power' + powerNumber + '.out' });
            let a = this.vw((100 - this.settings.card.eWidth.substr(0, 2)) / 2);
            let b = this.getOffset(this.activeCard).left;
            let c = this.sliderPosition + (a - b) - 200;
            gsap.to(this.data_container, { x: c, ease: 'power' + powerNumber + '.out' });
            this.sliderPosition = c;

            let tl = gsap.timeline();
            tl.to(this.activeCard.firstChild, { duration: 0.15, opacity: 0 });
            tl.to(this.activeCard.firstChild, { duration: 0, display: "none" });
            tl.to(this.activeCard.lastChild, { duration: 0, display: "flex" });
            tl.to(this.activeCard.lastChild, { duration: 0.30, opacity: 1, ease: "power0.out" });
        }
        else {
            gsap.to(this.activeCard, { width: this.settings.card.width, marginLeft: "0px", marginRight: "0px", ease: 'power' + powerNumber + '.out' });
            let a = this.vw((100 - this.settings.card.width.substr(0, 2)) / 2);
            let b = this.getOffset(this.activeCard).left;
            let c = this.sliderPosition + (a - b) + 200;
            gsap.to(this.data_container, { x: c, ease: 'power' + powerNumber + '.out' });
            this.sliderPosition = c;

            let tl = gsap.timeline();
            tl.to(this.activeCard.lastChild, { duration: 0.15, opacity: 0 });
            tl.to(this.activeCard.lastChild, { duration: 0, display: "none" });
            tl.to(this.activeCard.firstChild, { duration: 0, display: "flex" });
            tl.to(this.activeCard.firstChild, { duration: 0.30, opacity: 1, ease: "power0.out" });

            this.activeCard = undefined;
        }
    }
    getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }
    vw(v) {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        return (v * w) / 100;
    }
}
