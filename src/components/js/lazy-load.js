export default class LazyLoading {
    constructor(container) {
        this.imgArr = Array.prototype.slice.call(document.querySelectorAll(container));
        this.init();
    }
    init() {
        if ('IntersectionObserver' in window) {
            let lazyImageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry, index) => {
                    // 如果元素可见
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target
                        lazyImage.src = lazyImage.dataset.src
                        lazyImageObserver.unobserve(lazyImage)
                            // this.lazyImages.splice(index, 1)
                    }
                })
            })
            this.imgArr.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
            })
        } else {
            this.initview();
            window.addEventListener('scroll', this.initview)
        }
    }
    initview() {
        for (let i = 0; i < this.imgArr.length; i++) {
            let curimg = this.imgArr[i];
            if (curimg.getBoundingClientRect().top < window.innerHeight) {
                curimg.src = curimg.dataset.src;
                this.imgArr.splice(i, 1);
                this.imgArr.length--;
                i--;
                if (this.imgArr.length == 0) {
                    document.removeEventListener('scroll', this.initview);
                }
            }

        }
    }
}