// JS geral, todos os scripts se encontram aqui
/* --- UFSJ --- */
// Obrigatório usar DOMContentLoaded pois, senão, os elementos não são lidos corretamente
document.addEventListener("DOMContentLoaded", function () {
  // SCROLL & NAVBAR
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-container nav ul li a");
  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 250;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(id)) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  // DROPDOWN CURSOS
  // 1. Lógica do PAI (Campi)
  const campusHeaders = document.querySelectorAll(".campus-header");
  campusHeaders.forEach((header) => {
    header.addEventListener("click", (event) => {
      event.stopPropagation();
      const content = header.nextElementSibling;
      campusHeaders.forEach((otherHeader) => {
        if (
          otherHeader !== header &&
          otherHeader.classList.contains("active")
        ) {
          otherHeader.classList.remove("active");
          const otherContent = otherHeader.nextElementSibling;
          otherContent.style.maxHeight = null;
          otherContent.style.overflow = "hidden";
        }
      });
      header.classList.toggle("active");
      if (header.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
        // IMPORTANTE: Deixa o overflow visível após a animação
        // Isso permite que os filhos abram sem cortar
        setTimeout(() => {
          if (header.classList.contains("active")) {
            content.style.overflow = "visible";
            content.style.maxHeight = "none";
          }
        }, 500);
      } else {
        content.style.overflow = "hidden";
        content.style.maxHeight = null;
      }
    });
  });

  // 2. Lógica do FILHO (Cursos)
  const courseHeaders = document.querySelectorAll(".accordion-header");

  courseHeaders.forEach((header) => {
    header.addEventListener("click", (event) => {
      event.stopPropagation();
      const item = header.parentElement;
      const content = item.querySelector(".accordion-content");
      const parentContent = item.parentElement;
      parentContent.querySelectorAll(".accordion-item").forEach((sibling) => {
        if (sibling !== item && sibling.classList.contains("active")) {
          sibling.classList.remove("active");
          sibling.querySelector(".accordion-content").style.maxHeight = null;
        }
      });
      item.classList.toggle("active");
      if (item.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });

  /* --- CRONOGRAMA --- */
  // lÓGICA DO COMPORTAMENTO DO CRONOGRAMA COMO UM TODO
  const btns = document.querySelectorAll(".month-btn");
  const contents = document.querySelectorAll(".month-content");

  let currentIndex = 0;
  let isAnimating = false;

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (isAnimating) return;

      const targetIndex = parseInt(this.getAttribute("data-index"));

      if (targetIndex === currentIndex) return;

      isAnimating = true;

      const currentContent = contents[currentIndex];
      const targetContent = contents[targetIndex];

      btns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      contents.forEach((c) => {
        c.classList.remove(
          "anim-enter-left",
          "anim-exit-right",
          "anim-enter-right",
          "anim-exit-left"
        );
        if (c === targetContent) {
          c.classList.add("active");
          c.style.visibility = "visible";
          c.style.opacity = "1";
        }
      });

      // Classes do CSS que serão aplicadas
      if (targetIndex > currentIndex) {
        currentContent.classList.add("anim-exit-left");
        targetContent.classList.add("anim-enter-right");
      } else {
        currentContent.classList.add("anim-exit-right");
        targetContent.classList.add("anim-enter-left");
      }

      currentIndex = targetIndex;

      setTimeout(() => {
        currentContent.classList.remove(
          "active",
          "anim-exit-right",
          "anim-exit-left"
        );
        currentContent.style.visibility = "";
        currentContent.style.opacity = "";

        isAnimating = false;
      }, 600);
    });
  });

  /* --- ASSISTÊNCIA ESTUDANTIL --- */
  const track = document.getElementById("carousel-track");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  // Lógica do botão para fazer o scroll
  // Largura do scroll = Tamanho do Card (320px) + Gap (20px)
  const scrollAmount = 340;

  if (track && btnPrev && btnNext) {
    btnNext.addEventListener("click", () => {
      track.scrollLeft += scrollAmount;
    });

    btnPrev.addEventListener("click", () => {
      track.scrollLeft -= scrollAmount;
    });
  }

  const tabs = document.querySelectorAll(".tab-btn");
  const groups = document.querySelectorAll(".faq-group");

  if (tabs.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove ativo de todos
        tabs.forEach((t) => t.classList.remove("active"));
        groups.forEach((g) => g.classList.remove("active"));

        // Ativa o clicado
        tab.classList.add("active");

        // Mostra o grupo correspondente
        const category = tab.getAttribute("data-category");
        document.getElementById(category).classList.add("active");
      });
    });
  }
});

/* --- INDEX --- */
// SLIDER
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides((slideIndex += n));
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}
setInterval(() => {
  plusSlides(1);
}, 5000);
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    plusSlides(-1);
  });

  nextBtn.addEventListener("click", () => {
    plusSlides(1);
  });
}
