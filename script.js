// Each slide will have its own index, for simplicity we will assign the array index to the slides
var slideIndex = 0;
// Tell us what slide we're on
var currentSlideIndex = 0;
// Array of our slides
var slideArray = [];
const swiper = {
    wrapper: document.querySelector(".swiper-wrapper"),
    nextBtn: document.querySelector(".slider-next"),
    prevBtn: document.querySelector(".slider-prev"),
    swiperItem: document.querySelectorAll(".swiper-item"),
    currentSlideIndex: 0,
    totalSlideItem: null,
    init: function (sliderShowNum) {
        // let swiperItem = document.querySelectorAll(".swiper-item");
        const wrapperWidth = document.querySelector(".swiper").offsetWidth;
        this.totalSlideItem = this.swiperItem.length;
        for (const item of this.swiperItem) {
            item.style.width = wrapperWidth / sliderShowNum + "px";
        }
        this.dimmedSlideControl()
        this.createBullets()
    },
    slideRight: function (slideNum) {
        const wrapperWidth = document.querySelector(".swiper-wrapper").offsetWidth;
        const style = window.getComputedStyle(this.wrapper);
        const wraperTranslatedValue = new WebKitCSSMatrix(style.transform).m41;
        let wraperSlideAmount = wraperTranslatedValue - (wrapperWidth * slideNum )
        this.wrapper.style.transform = "translateX(" + (wraperSlideAmount) + "px)";
        this.currentSlideIndex = this.currentSlideIndex + (1 * slideNum);
        document.querySelector(`.bullets .active`).classList.remove('active');
        document.querySelectorAll(`.bullets span`)[this.currentSlideIndex].classList.add('active');
        this.dimmedSlideControl()
    },
    slideLeft: function (slideNum) {
        const wrapperWidth = document.querySelector(".swiper-wrapper").offsetWidth;
        const style = window.getComputedStyle(this.wrapper);
        const wraperTranslatedValue = new WebKitCSSMatrix(style.transform).m41;
        let wraperSlideAmount = wraperTranslatedValue + (wrapperWidth * slideNum)
        this.wrapper.style.transform = "translateX(" + (wraperSlideAmount) + "px)";
        this.currentSlideIndex = this.currentSlideIndex - (1 * slideNum);
        document.querySelector(`.bullets .active`).classList.remove('active');
        document.querySelectorAll(`.bullets span`)[this.currentSlideIndex].classList.add('active');
        this.dimmedSlideControl()

    },
    dimmedSlideControl: function () {
        if (this.totalSlideItem === 1) {
            this.prevBtn.classList.add("disable")
            this.nextBtn.classList.add("disable")

        } else if (this.currentSlideIndex === 0) {
            this.prevBtn.classList.add("disable")
            this.nextBtn.classList.remove("disable")


        } else if (this.currentSlideIndex === this.totalSlideItem - 1) {
            this.nextBtn.classList.add("disable")
            this.prevBtn.classList.remove("disable")

        } else {
            this.prevBtn.classList.remove("disable")
            this.nextBtn.classList.remove("disable")
        }
    },
    createBullets: function () {
        if (this.swiperItem === 1) return;
        let wrapper = document.querySelector(".bullets");
        wrapper.classList.add("bullets");
        let bullets = []
        this.swiperItem.forEach(function (element, indx) {
            if (indx === 0) bullets.push("<span class='active'></span>")
            else bullets.push("<span></span>");
        });
        wrapper.innerHTML = bullets.join('');
        let bulletEle = document.querySelectorAll(".bullets span");

        for(let indx = 0;  indx < bulletEle.length; indx++) {
            let instance = this
            bulletEle[indx].addEventListener("click", function (e) {
                console.log("bullet clicked", indx);
                if (indx > instance.currentSlideIndex) {
                    instance.slideRight(Math.abs(instance.currentSlideIndex - indx))
                } else if (indx < instance.currentSlideIndex) {
                    instance.slideLeft(Math.abs(instance.currentSlideIndex - indx))
                }
            })
        }
        bulletEle.forEach(function (bullet, indx) {
            bullet.addEventListener("click", function (e) {
                console.log("bullet clicked", indx);
                if (indx > this.currentSlideIndex) {
                    this.slideRight(this.currentSlideIndex - indx)
                } else if (indx < this.currentSlideIndex) {
                    this.slideLeft(indx - this.currentSlideIndex)
                }
            })
        })

    }
}

swiper.init(1);
swiper.nextBtn.addEventListener("click", function (e) {
    swiper.slideRight(1);
})
swiper.prevBtn.addEventListener("click", function (e) {
    swiper.slideLeft(1);
})
window.addEventListener('resize', (event) => {
    swiper.init(1);
});