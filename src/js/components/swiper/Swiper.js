export default function Swiper(items = []){
    return {
        currentSlideIndex: 0,
        items: items,
        setCurrentSlide(swiper){
            const activeIndex = swiper.detail[0].activeIndex;
            this.currentSlideIndex = activeIndex;
        },
        getProgressPercentage(){
            console.log(this.currentSlideIndex/(items.length-1))*100;
            return (this.currentSlideIndex/(items.length-1))*100;
        }
    }
}