//Supprimer l'anti click
//Revoir le responsive
//Refactorer (margin ?)

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
        this.updateFilter();
        this.updateData();
    }
    createSlider() {
        let filter = document.createElement("div");
        filter.setAttribute("class", "slider-filter");

        let filter_by_houblons = document.createElement("button");
        filter_by_houblons.innerHTML = "Houblons";
        filter_by_houblons.addEventListener("click", () => {
            this.activeData = this.data.hops;
            this.updateFilter();
            this.updateData();
        });

        let filter_by_malts = document.createElement("button");
        filter_by_malts.innerHTML = "Malts";
        filter_by_malts.addEventListener("click", (e) => {
            console.log(e.target.innerHTML.toLowerCase());
            this.activeData = this.data.malts;
            this.updateFilter();
            this.updateData();
        });

        let filter_by_levures = document.createElement("button");
        filter_by_levures.innerHTML = "Levures";
        filter_by_levures.addEventListener("click", () => {
            this.activeData = this.data.yeasts;
            this.updateFilter();
            this.updateData();
        });

        let input = document.createElement("input");
        input.addEventListener("input", (e) => {
            this.updateData(e.target.value);
        })

        this.filter_by_key = document.createElement("select");

        filter.appendChild(filter_by_houblons);
        filter.appendChild(filter_by_malts);
        filter.appendChild(filter_by_levures);
        filter.appendChild(this.filter_by_key);
        filter.appendChild(input);

        this.data_container = document.createElement("div");
        this.data_container.setAttribute("class", "slider-data_container");
        this.data_container.style.gap = this.settings.card.gap;


        this.sliding_container = document.createElement("div");
        this.sliding_container.classList.add("slider-sliding_container");
        this.sliding_container.appendChild(this.data_container);

        this.slider.appendChild(filter);
        this.slider.appendChild(this.sliding_container);

        console.log(this.filter_by_key)

        this.initSlider();
    }
    initSlider() {
        let clientX = null;
        let grabbing = false;
        this.prevDistanceScrolled = null;
        let distanceToScroll;
        let temp;

        this.sliding_container.addEventListener("mousedown", (e) => {
            clientX = e.clientX;
            grabbing = true;

        })

        this.sliding_container.addEventListener("mouseup", () => {
            slidingEnding();
        })

        this.sliding_container.addEventListener("mouseleave", () => {
            slidingEnding();
        })

        const slidingEnding = () => {
            grabbing = false;
            if (distanceToScroll != temp) {
                this.prevDistanceScrolled += distanceToScroll;
                temp = distanceToScroll;
                setTimeout(() => {
                    this.openningCardsIsLocked = false;
                }, 1);
            }
        }

        this.sliding_container.addEventListener("mousemove", (e) => {
            if (grabbing) {
                this.openningCardsIsLocked = true;
                let newClientX = e.clientX;
                distanceToScroll = newClientX - clientX;
                let offset = distanceToScroll + this.prevDistanceScrolled;
                gsap.to(this.sliding_container, { x: offset });
            }
        })
    }
    resetSlider() {
        this.prevDistanceScrolled = 0;
        this.sliderPosition = 0;
        gsap.to(this.sliding_container, { x: 0, duration: 0 });
        gsap.to(this.data_container, { x: 0, duration: 0 });
    }

    updateFilter() {
        this.filter_by_key.innerHTML = Object.keys(...this.activeData).map(key => "<option value=" + key + ">" + key.charAt(0).toUpperCase() + key.slice(1).toLowerCase() + "</option>").reduce((a, b) => a + b);
    }

    updateData(input) {
        this.data_container.innerHTML = "";

        let activeDataFiltered;
        if (input) {
            activeDataFiltered = this.activeData.filter(elem => elem[this.filter_by_key.value].toLowerCase().includes(input.toLowerCase()));
            this.resetSlider();
        }
        else {
            activeDataFiltered = this.activeData;
        }

        activeDataFiltered.forEach(elem => {
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
            <div>` + elem.NOTES + `</div>
            `;

            card.appendChild(content_collapsed);
            card.appendChild(content_expanded);

            card.addEventListener("click", (e) => {
                this.cardAnimationController(e);
            })
            this.data_container.appendChild(card);
        });
    }
    cardAnimationController(e) {
        if (!this.openningCardsIsLocked) {
            if (e.target != this.activeCard) {
                if (this.activeCard) {
                    this.collapseActiveCard(e);
                    setTimeout(() => {
                        this.expandActiveCard(e);
                    }, 300)
                }
                else {
                    this.expandActiveCard(e);
                }
            }
            else {
                this.collapseActiveCard(e);
            }
        }
    }

    expandActiveCard(e) {
        let powerNumber = 4;

        this.activeCard = e.target;
        gsap.to(this.activeCard, { width: this.settings.card.eWidth, marginLeft: this.vw(10), marginRight: this.vw(10), ease: 'power' + powerNumber + '.out' });
        let a = this.vw((100 - this.settings.card.eWidth.substr(0, 2)) / 2);
        let b = this.getOffset(this.activeCard).left;
        let c = this.sliderPosition + (a - b) - this.vw(10);
        gsap.to(this.data_container, { x: c, ease: 'power' + powerNumber + '.out' });
        this.sliderPosition = c;

        let tl = gsap.timeline();
        tl.to(this.activeCard.firstChild, { duration: 0.15, opacity: 0 });
        tl.to(this.activeCard.firstChild, { duration: 0, display: "none" });
        tl.to(this.activeCard.lastChild, { duration: 0, display: "flex" });
        tl.to(this.activeCard.lastChild, { duration: 0.30, opacity: 1, ease: "power0.out" });
    }

    collapseActiveCard(e) {
        let powerNumber = 4;

        gsap.to(this.activeCard, { width: this.settings.card.width, marginLeft: "0px", marginRight: "0px", ease: 'power' + powerNumber + '.out' });
        let a = this.vw((100 - this.settings.card.width.substr(0, 2)) / 2);
        let b = this.getOffset(this.activeCard).left;
        let c = this.sliderPosition + (a - b) + this.vw(10);
        gsap.to(this.data_container, { x: c, ease: 'power' + powerNumber + '.out' });
        this.sliderPosition = c;

        let tl = gsap.timeline();
        tl.to(this.activeCard.lastChild, { duration: 0.15, opacity: 0 });
        tl.to(this.activeCard.lastChild, { duration: 0, display: "none" });
        tl.to(this.activeCard.firstChild, { duration: 0, display: "flex" });
        tl.to(this.activeCard.firstChild, { duration: 0.30, opacity: 1, ease: "power0.out" });

        this.activeCard = undefined;
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
