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
                    "gap": "2rem",
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

        this.sliding_container.addEventListener("mousedown", (e) => {
            clientX = e.clientX;
            grabbing = true;
        })

        this.sliding_container.addEventListener("mouseup", () => {
            grabbing = false;
            prevDistanceScrolled += distanceToScroll;
            setTimeout(() => {
                this.openningCardsIsLocked = false;
            }, 25);
        })

        this.sliding_container.addEventListener("mousemove", (e) => {
            if (grabbing) {
                this.openningCardsIsLocked = true;

                let newClientX = e.clientX;
                distanceToScroll = newClientX - clientX;

                /* this.sliding_container.style.transform = `translateX(${distanceToScroll + prevDistanceScrolled}px)` */
                
                let offset = distanceToScroll + prevDistanceScrolled;
                gsap.to(this.sliding_container, { x: offset, ease:"sine.Out" });
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

            card.innerHTML = elem.NAME;

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
            gsap.to(this.activeCard, { width: this.settings.card.eWidth, ease: 'power' + powerNumber + '.out' });
            let a = this.vw((100 - this.settings.card.eWidth.substr(0, 2)) / 2);
            let b = this.getOffset(this.activeCard).left;
            let c = this.sliderPosition + (a - b);
            gsap.to(this.data_container, { x: c, ease: 'power' + powerNumber + '.out' });
            this.sliderPosition = c;
        }
        else {
            gsap.to(this.activeCard, { width: this.settings.card.width, ease: 'power' + powerNumber + '.out' });
            let a = this.vw((100 - this.settings.card.width.substr(0, 2)) / 2);
            let b = this.getOffset(this.activeCard).left;
            let c = this.sliderPosition + (a - b);

            gsap.to(this.data_container, { x: c, ease: 'power' + powerNumber + '.out' });
            this.sliderPosition = c;

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

    vh(v) {
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        return (v * h) / 100;
    }

    vw(v) {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        return (v * w) / 100;
    }
}
