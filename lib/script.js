
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
    // duration: 2.3,
    // smoothTouch: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const header = document.querySelector("header");

if (document.querySelector(".mySwiper")) {
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

}

if (document.querySelector(".mySwiper-2")) {
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
  
}

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
      }
    });
    block.addEventListener("mouseleave", () => {
      const svg = block.querySelector("#pathChanger");
      if (svg) {
        svg.querySelector("path").setAttribute("d", hexagonPath);
      }
    });
  });
}

const mainNavLinks = document.querySelectorAll(".main_navLink");
if (mainNavLinks) {
  mainNavLinks.forEach(link => {
    link.addEventListener("click", evt => {
      evt.stopPropagation();
        const target = evt.currentTarget.getAttribute("data-target");
        const activeTab = header.querySelector("[tab-status='active']");
        const activeContent = header.querySelector(".navContent [content-status='active']");
        if (activeTab) {
          activeTab.setAttribute("tab-status", "in-active");
        }
        if (activeContent && target !== activeContent.getAttribute("data-target")) {
          activeContent.setAttribute("content-status", "in-active");  
          setTimeout(() => {
            activeContent.classList.add("d-none");
          }, 400);
        }        
        evt.currentTarget.setAttribute("tab-status", "active");
        const setActive = header.querySelector(`.navContent [data-target='${target}']`);
        setTimeout(() => {
          setActive.classList.remove("d-none");
        }, 500);
        setTimeout(() => {
          setActive.setAttribute("content-status", "active");
        }, 550);
        if (header) {
          header.classList.add("activeContent");
          lenis.stop();
        }
    });
  });
}

const closeMainHeader = () => {
  document.querySelector("header").classList.remove("activeContent");
  lenis.start();
  const activeContent = header.querySelector(".navContent [content-status='active']");
  if (activeContent) {
    activeContent.setAttribute("content-status", "in-active");  
    setTimeout(() => {
      activeContent.classList.add("d-none");
    }, 400);
  }
}

if (header) {
  header.addEventListener("click", closeMainHeader);
}

const allHeaderEls = document.querySelectorAll("header a, header .searchWrapper");
if (allHeaderEls) {
  allHeaderEls.forEach(el => {
    el.addEventListener("click", evt => {
      evt.stopPropagation();
    });
  });
}

window.addEventListener('scroll', () => {
  const header = document.querySelector("header");
  if (header) {
    if (window.scrollY >= 100) {
      header.classList.add("active_bg");
    } else {
      header.classList.remove("active_bg");
    }
  }
});

const aboutSlides = document.querySelectorAll(".history_section .heading_block .swiper-slide")?.length;

const aboutSwiper = new Swiper(".aboutSwiper", {
  direction: "vertical",
  speed: 500,
  effect: 'easeIn',
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 0,    
  centeredSlides: true, 
  allowTouchMove: false,
});
if (document.querySelector(".aboutSwiper")) {
  
  const aboutSwiperDiv = document.querySelector(".aboutSwiper");
  const historySection = document.querySelector(".history_section");
  
  ScrollTrigger.create({
      trigger: historySection,
      start: "top top",
      end: "bottom top",
      onEnter: () => aboutSwiperDiv.classList.add("active"),
      onLeaveBack: () => aboutSwiperDiv.classList.remove("active"),
      // onToggle: self => aboutSwiperDiv.classList.toggle("active", self.isActive),
      // markers: true,
  });
}


function resizer() {
  const stickyTops = document.querySelectorAll(".sticky_top");
  if (stickyTops) {
    stickyTops.forEach(el => {
      const top = el.clientHeight - window.innerHeight;
      el.style.top = "-" + top + "px";
    });
  }
  const historySection = document.getElementById("history_section");
  const aboutSwiperDiv = document.querySelector(".aboutSwiper");
  const yearBlocks = historySection.querySelectorAll(".year_block");
  if (
    historySection &&
    aboutSwiperDiv &&
    aboutSlides === yearBlocks.length
    ) {
      yearBlocks.forEach((block, idx) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top 70%",
          end: "bottom bottom",
          onEnter: () => {
            if (idx !== 0) {
              aboutSwiper.slideTo(idx);
            }
          },
          onEnterBack: () => {
            if (idx !== aboutSlides) {
              aboutSwiper.slideTo(idx);              
            }
          },
        });
      });
  } else {
    console.log("Our Story has different number of years!");
  }
}

window.addEventListener("resize", resizer);

resizer();
