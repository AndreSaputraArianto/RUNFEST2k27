/* =========================================================
   CONFIG: change the race date and time here (local time)
   ========================================================= */
const RACE_DATE = new Date("2027-04-18T05:30:00");

/* ---------- 1. Real-time countdown ---------- */
const cd = {
  days: document.getElementById("cd-days"),
  hours: document.getElementById("cd-hours"),
  mins: document.getElementById("cd-mins"),
  secs: document.getElementById("cd-secs"),
};
const pad = (n) => String(n).padStart(2, "0");

function updateCountdown() {
  const diff = Math.max(0, RACE_DATE - new Date());
  cd.days.textContent = pad(Math.floor(diff / 864e5));
  cd.hours.textContent = pad(Math.floor(diff / 36e5) % 24);
  cd.mins.textContent = pad(Math.floor(diff / 6e4) % 60);
  cd.secs.textContent = pad(Math.floor(diff / 1e3) % 60);
  if (diff === 0) clearInterval(timer); // race day: stays at 00
}
updateCountdown();
const timer = setInterval(updateCountdown, 1000);

/* ---------- 2. Navigation: solid bar on scroll + mobile menu ---------- */
const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 40), { passive: true });

function setMenu(open) {
  links.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
}
toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

/* ---------- 3. Reveal elements as they scroll into view ---------- */
// Add class="reveal" to any element in index.html to animate it
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (e.target.dataset.delay || 0) + "ms";
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  // Small stagger for sibling cards and gallery items
  document.querySelectorAll(".cards .reveal, .info .reveal").forEach((el, i) => (el.dataset.delay = (i % 4) * 90));
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

/* ---------- 4. Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
