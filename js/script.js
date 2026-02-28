document.addEventListener("DOMContentLoaded", () => {
  // ========================
  // Mobile Menu Toggle
  // ========================
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav ul");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

  // ========================
  // Slider Functionality
  // ========================
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentSlide = 0;
  const totalSlides = slides.length;
  const intervalTime = 5000; // 5 seconds

  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }, intervalTime);
  }

  // Auto-slide
  let slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }, intervalTime);

  // Prev/Next buttons
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
      resetInterval();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
      resetInterval();
    });
  }

  // Dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
      resetInterval();
    });
  });

  // Initialize first slide
  showSlide(currentSlide);

  // ========================
  // Contact Form Submission
  // ========================
  emailjs.init("GFIizdhqR99c5zhBN"); // replace with your real public key

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "red";
        return;
      }

      formMessage.textContent = "Sending message...";
      formMessage.style.color = "#ffd700";

      emailjs
        .send("graphique_eloise_1208", "template_jxkjn6p", {
          name,
          email,
          message,
        })
        .then(
          () => {
            formMessage.textContent = "Message sent successfully!";
            formMessage.style.color = "green";
            contactForm.reset();
          },
          (error) => {
            formMessage.textContent = "Failed to send message.";
            formMessage.style.color = "red";
            console.log("EmailJS error:", error);
          },
        );
    });
  }
});
