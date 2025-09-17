document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".menu").classList.toggle("ativo");
});

document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const carouselTrack = document.querySelector(".client-carousel-track");
  const slides = Array.from(carouselTrack.children); // Todos os slides (logos)
  const carouselDotsContainer = document.querySelector(".carousel-dots");
  const trackContainer = document.querySelector(".client-carousel-track-container");

  if (carouselTrack && slides.length > 0) {
    let slideWidth = slides[0].offsetWidth; // Largura de um slide
    let logosPerPage; // Quantas logos são visíveis por "página"
    let currentDotIndex = 0; // Índice do ponto ativo (página atual)

    // Função para calcular quantas logos por página e quantas páginas
    const updateCarouselSettings = () => {
      if (window.innerWidth >= 960) {
        logosPerPage = 5;
      } else if (window.innerWidth >= 768) {
        logosPerPage = 4;
      } else if (window.innerWidth >= 480) {
        logosPerPage = 3;
      } else {
        logosPerPage = 2;
      }
      // Garante que o slideWidth seja atualizado com o tamanho correto do slide visível
      slideWidth = carouselTrack.children[0] ? carouselTrack.children[0].offsetWidth : 0;

      generateDots(); // Gera os pontos com base na nova contagem
      moveToSlide(currentDotIndex); // Move para o slide atual (para ajustar o layout)
    };

    // Gerar pontos de navegação
    const generateDots = () => {
      carouselDotsContainer.innerHTML = ''; // Limpa pontos existentes
      const totalPages = Math.ceil(slides.length / logosPerPage); // Calcula quantas "páginas" de logos existem

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

    // Função para mover o carrossel para uma página específica
    const moveToSlide = (index) => {
      const totalPages = Math.ceil(slides.length / logosPerPage);
      currentDotIndex = (index + totalPages) % totalPages; // Garante que o index esteja dentro dos limites

      const offset = currentDotIndex * (slideWidth * logosPerPage); // Calcula o deslocamento total
      carouselTrack.style.transform = `translateX(-${offset}px)`;

      // Atualiza a classe 'active' dos pontos
      document.querySelectorAll(".dot").forEach((dot, i) => {
        if (i === currentDotIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    };

    // Auto-scroll (avançar para a próxima página)
    let autoScrollInterval;
    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        moveToSlide(currentDotIndex + 1);
      }, 4000); // Avança a cada 4 segundos
    };

    const resetAutoScroll = () => {
      clearInterval(autoScrollInterval);
      startAutoScroll();
    };

    // Inicia tudo
    updateCarouselSettings(); // Configura inicial e gera os pontos
    //startAutoScroll(); // Inicia o auto-scroll

    // Atualiza configurações e pontos ao redimensionar a janela
    window.addEventListener("resize", () => {
      updateCarouselSettings();
    });

    // Pausar auto-scroll ao passar o mouse sobre o carrossel
    trackContainer.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    trackContainer.addEventListener('mouseleave', () => startAutoScroll());

    // Opcional: Pausar auto-scroll ao passar o mouse sobre os pontos
    carouselDotsContainer.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    //carouselDotsContainer.addEventListener('mouseleave', () => startAutoScroll());
  }
});

