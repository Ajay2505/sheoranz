
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
    duration: 2.3,
    smoothTouch: true,
    // duration: 1.2,
    // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // direction: 'vertical', // vertical, horizontal
    // gestureDirection: 'vertical', // vertical, horizontal, both
    // smooth: true,
    // mouseMultiplier: 1,
    // smoothTouch: false,
    // touchMultiplier: 2,
    // infinite: false,
});

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


const swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
    speed: 1000,
    effect: 'easeIn',
    allowTouchMove: false
});


const swiper2 = new Swiper(".mySwiper-2", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  speed: 1000,
  effect: 'easeIn',
  allowTouchMove: false
});

gsap.to(".mySwiper", {
    y: 250, 
    scrollTrigger: {
        trigger: ".mySwiper",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers: true
    }
});

const largeHeadingBlocks = document.querySelectorAll("section.large_heading_block");
if (largeHeadingBlocks) {
  const hexagonPath = "M 10 110 C 5 110 0.5 105.5 0.5 100.5 V 40 C 0.5 36.75 2 34 4.5 32 L 47.75 2.5 C 49 1.5 51 1 53 1 H 100 C 105 1 109.5 5.5 109.5 10.5 V 69.75 C 109.5 72.75 108 75.5 105.5 77.5 L 62 108 C 60.75 109 59 110 57 110 H 10 Z";
  // path("M 10 110 C 5 110 0.5 105.5 0.5 100.5 V 40 C 0.5 36.75 0.5 35.25 0.5 32 L 0.5 10.5 C 0.5 5.5 5 1 10 1 H 100 C 105 1 109.5 5.5 109.5 10.5 V 69.75 C 109.5 72.75 109.5 74.5 109.5 77.5 L 110 100.5 C 110 105.5 105 110 100 110 H 10 Z");
  const squarePath = "M 10 110 C 5 110 0.5 105.5 0.5 100.5 V 40 C 0.5 36.75 0.5 35.25 0.5 32 L 0.5 10.5 C 0.5 5.5 5 1 10 1 H 100 C 105 1 109.5 5.5 109.5 10.5 V 69.75 C 109.5 72.75 109.5 74.5 109.5 77.5 L 110 100.5 C 110 105.5 105 110 100 110 H 10 Z";
  largeHeadingBlocks.forEach(block => {
    block.addEventListener("mouseenter", () => {
      const svg = block.querySelector("#pathChanger");
      if (svg) {
        svg.querySelector("path").setAttribute("d", squarePath);
        // gsap.to(svg.querySelector("path"), { duration: .7, attr: { d: squarePath } });
      }
    });
    block.addEventListener("mouseleave", () => {
      const svg = block.querySelector("#pathChanger");
      if (svg) {
        svg.querySelector("path").setAttribute("d", hexagonPath);
        // gsap.to(svg.querySelector("path"), { duration: .7, attr: { d: hexagonPath } });
      }
    });
  });
}
