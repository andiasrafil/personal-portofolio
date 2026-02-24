// Scroll reveal for experience roles and project rows
const revealItems = document.querySelectorAll('.role, .project');

const revealObserver = new IntersectionObserver(
  (entries) => {
    let delay = 0;
    entries
      .filter((e) => e.isIntersecting)
      .forEach((entry) => {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 80);
        delay++;
        revealObserver.unobserve(entry.target);
      });
  },
  { threshold: 0.1 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Nav border on scroll
const nav = document.getElementById('nav');

function updateNav() {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// Footer contact active state
const footer = document.getElementById('contact');
if (footer) {
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#contact') {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );
  footerObserver.observe(footer);
}
