// Gumbi Construction interactions
const WHATSAPP_NUMBER = "27751888217";
const DEFAULT_MESSAGE = "Hello Gumbi Construction, I would like to enquire about your construction services. Please assist me with a quote.";

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll(".wa-link").forEach(link => {
  const message = link.dataset.message || DEFAULT_MESSAGE;
  link.href = whatsappUrl(message);
  link.target = "_blank";
  link.rel = "noopener";
});

document.querySelectorAll(".service-wa").forEach(button => {
  button.addEventListener("click", () => {
    const service = button.dataset.service || "your services";
    const message = `Hello Gumbi Construction, I am interested in ${service}. Please provide more information and a quote.`;
    window.open(whatsappUrl(message), "_blank", "noopener");
  });
});

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

// Scroll reveal animations
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Subtle 3D tilt on desktop service cards
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (canHover) {
  document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.transform = `perspective(900px) rotateX(${(0.5-y)*5}deg) rotateY(${(x-0.5)*6}deg) translateY(-3px)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "");
  });
}

// Contact form opens a pre-filled WhatsApp enquiry (no backend required)
const enquiryForm = document.getElementById("enquiry-form");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;
    const data = new FormData(enquiryForm);
    const message = [
      "Hello Gumbi Construction, I would like to request a quote.",
      `Name: ${data.get("name")}`,
      `Contact number: ${data.get("phone") || "Not provided"}`,
      `Service: ${data.get("service")}`,
      `Project location: ${data.get("location") || "Not provided"}`,
      `Project details: ${data.get("message") || "I would like to discuss this with you."}`
    ].join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener");
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
