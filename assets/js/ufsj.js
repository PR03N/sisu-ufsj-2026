/*
Obrigatório usar DOMContentLoaded pois, senão, os elementos não são lidos corretamente
*/
document.addEventListener("DOMContentLoaded", function () {
  /* --- SCROLL & NAVBAR --- */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-container nav ul li a");
  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 200;
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

  /* --- DROPDOWN CURSOS --- */
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const currentItem = header.parentElement;
      const currentContent = currentItem.querySelector(".accordion-content");
      document.querySelectorAll(".accordion-item").forEach((item) => {
        if (item !== currentItem) {
          item.classList.remove("active");
          item.querySelector(".accordion-content").style.maxHeight = null;
        }
      });
      currentItem.classList.toggle("active");
      if (currentItem.classList.contains("active")) {
        currentContent.style.maxHeight = currentContent.scrollHeight + "px";
      } else {
        currentContent.style.maxHeight = null;
      }
    });
  });
});
