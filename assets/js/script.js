document.addEventListener("DOMContentLoaded", function () {

  // --- SELETORES GERAIS ---
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const menuLinks = document.querySelectorAll('.menu a');
  const body = document.querySelector("body");
  const backToTopButton = document.getElementById("backToTop");

  // --- CONTROLE DO MENU MOBILE ---
  if (menuToggle && menu && body) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("ativo");
      body.classList.toggle("no-scroll");
    });
  }

  if (menuLinks.length > 0 && menu && body) {
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('ativo');
        body.classList.remove('no-scroll');
      });
    });
  }

  // --- BOTÃO VOLTAR AO TOPO ---
  if (backToTopButton) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
        backToTopButton.style.display = "flex";
      } else {
        backToTopButton.style.display = "none";
      }
    });

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- CÓDIGO DO CARROSSEL --- 
  const carouselTrack = document.querySelector(".client-carousel-track");
  const slides = Array.from(carouselTrack.children);
  const carouselDotsContainer = document.querySelector(".carousel-dots");
  const trackContainer = document.querySelector(".client-carousel-track-container");

  if (carouselTrack && slides.length > 0) {
    let slideWidth = slides[0].offsetWidth;
    let logosPerPage;
    let currentDotIndex = 0;

    const updateCarouselSettings = () => {
      if (window.innerWidth >= 960) {
        logosPerPage = 4;
      } else if (window.innerWidth >= 768) {
        logosPerPage = 3;
      } else {
        logosPerPage = 2;
      }
      slideWidth = carouselTrack.children[0] ? carouselTrack.children[0].offsetWidth : 0;

      generateDots();
      moveToSlide(currentDotIndex);
    };

    const generateDots = () => {
      carouselDotsContainer.innerHTML = '';
      const totalPages = Math.ceil(slides.length / logosPerPage);

      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === currentDotIndex) {
          dot.classList.add("active");
        }
        dot.addEventListener("click", () => {
          moveToSlide(i);
          //resetAutoScroll();
        });
        carouselDotsContainer.appendChild(dot);
      }
    };

    const moveToSlide = (index) => {
      const totalPages = Math.ceil(slides.length / logosPerPage);
      currentDotIndex = (index + totalPages) % totalPages;

      const offset = currentDotIndex * (slideWidth * logosPerPage);
      carouselTrack.style.transform = `translateX(-${offset}px)`;

      document.querySelectorAll(".dot").forEach((dot, i) => {
        if (i === currentDotIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    };

    let autoScrollInterval;
    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        moveToSlide(currentDotIndex + 1);
      }, 5000);
    };

    const resetAutoScroll = () => {
      clearInterval(autoScrollInterval);
      startAutoScroll();
    };

    updateCarouselSettings();
    //startAutoScroll();

    window.addEventListener("resize", () => {
      updateCarouselSettings();
    });

    trackContainer.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    trackContainer.addEventListener('mouseleave', () => startAutoScroll());

    carouselDotsContainer.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    //carouselDotsContainer.addEventListener('mouseleave', () => startAutoScroll());
  }
});
