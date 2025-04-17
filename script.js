// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector("#navbar");

  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      });
    });
  });

  // Active navigation links based on scroll position
  const sections = document.querySelectorAll("section");

  function highlightNavOnScroll() {
    let scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document
          .querySelector(`a[href="#${sectionId}"]`)
          .classList.add("active");
      } else {
        document
          .querySelector(`a[href="#${sectionId}"]`)
          .classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll);

  // Typing animation effect for the hero section
  const typedTextElement = document.getElementById("typed-text");
  const professions = ["Student", "Learner", "Thinker"];
  let professionIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100; // Delay between characters when typing
  let erasingDelay = 50; // Delay between characters when erasing
  let newTextDelay = 2000; // Delay before erasing text

  function typeEffect() {
    const currentProfession = professions[professionIndex];

    if (isDeleting) {
      charIndex--;
      typingDelay = erasingDelay;
    } else {
      charIndex++;
      typingDelay = typingDelay;
    }

    typedTextElement.textContent = currentProfession.substring(0, charIndex);

    // If word is completely typed
    if (!isDeleting && charIndex === currentProfession.length) {
      isDeleting = true;
      typingDelay = newTextDelay;
    }
    // If word is completely deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      professionIndex = (professionIndex + 1) % professions.length;
      typingDelay = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingDelay);
  }

  typeEffect(); // Start the typing animation

  // Animated skill bars
  const skillCards = document.querySelectorAll(".skill-card");

  function animateSkills() {
    skillCards.forEach((card) => {
      const progressBar = card.querySelector(".skill-progress");
      const targetWidth = progressBar.style.width;

      progressBar.style.width = "0%";

      setTimeout(() => {
        progressBar.style.width = targetWidth;
        progressBar.style.transition = "width 1.5s ease-in-out";
      }, 300);
    });
  }

  // Use Intersection Observer to animate skills when they come into view
  const skillsSection = document.querySelector("#skills");

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills();
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  skillsObserver.observe(skillsSection);

  // Form validation
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    let isValid = true;

    if (name === "") {
      showError("name", "Please enter your name");
      isValid = false;
    } else {
      removeError("name");
    }

    if (email === "") {
      showError("email", "Please enter your email");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError("email", "Please enter a valid email address");
      isValid = false;
    } else {
      removeError("email");
    }

    if (subject === "") {
      showError("subject", "Please enter a subject");
      isValid = false;
    } else {
      removeError("subject");
    }

    if (message === "") {
      showError("message", "Please enter your message");
      isValid = false;
    } else {
      removeError("message");
    }

    if (isValid) {
      // Simulate form submission (you would normally send this to a backend)
      showSuccessMessage("Your message has been sent successfully!");
      contactForm.reset();
    }
  });

  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const existingError = input.parentElement.querySelector(".error-message");

    if (!existingError) {
      const errorSpan = document.createElement("span");
      errorSpan.className = "error-message";
      errorSpan.style.color = "red";
      errorSpan.style.fontSize = "0.8rem";
      errorSpan.style.display = "block";
      errorSpan.style.marginTop = "5px";
      errorSpan.textContent = message;

      input.style.borderColor = "red";
      input.parentElement.appendChild(errorSpan);
    }
  }

  function removeError(inputId) {
    const input = document.getElementById(inputId);
    const existingError = input.parentElement.querySelector(".error-message");

    if (existingError) {
      existingError.remove();
      input.style.borderColor = "";
    }
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement("div");
    notification.className = "success-notification";
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "15px 20px",
      backgroundColor: "var(--success-color)",
      color: "white",
      borderRadius: "var(--border-radius)",
      boxShadow: "var(--box-shadow)",
      zIndex: "1000",
      transform: "translateY(100px)",
      transition: "transform 0.3s ease",
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateY(0)";
    }, 10);

    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.transform = "translateY(100px)";

      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 4000);
  }

  // Add active class to navbar on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      document.querySelector("header").classList.add("scrolled");
    } else {
      document.querySelector("header").classList.remove("scrolled");
    }
  });

  // Fade-in animation for sections
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeInElements = document.querySelectorAll("section");

  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeInElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    fadeObserver.observe(element);
  });

  // Add class to fade in elements when they enter the viewport
  document.addEventListener("scroll", () => {
    fadeInElements.forEach((element) => {
      if (isElementInViewport(element)) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  });

  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.85
    );
  }

  // Trigger initial scroll event to reveal elements already in viewport
  document.dispatchEvent(new Event("scroll"));
});
