const loader = document.querySelector(".loader");
const navbar = document.querySelector(".navbar");
const mouseLight = document.querySelector(".mouse-light");
const particles = document.querySelector(".particles");
const heroBg = document.querySelector(".hero-bg");
const heroContent = document.querySelector(".hero-content");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("loader-hidden");
  }, 1300);

  createParticles();
  createStars();
});

function createParticles(){
  for(let i = 0; i < 150; i++){
    const span = document.createElement("span");

    const size = Math.random() * 3.5 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 18 + 12;
    const delay = Math.random() * 15;
    const opacity = Math.random() * 0.75 + 0.12;

    span.style.left = `${left}%`;
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.animationDuration = `${duration}s`;
    span.style.animationDelay = `${delay}s`;
    span.style.opacity = opacity;

    particles.appendChild(span);
  }
}

function createStars(){
  setInterval(() => {
    const star = document.createElement("div");

    star.style.position = "fixed";
    star.style.width = "170px";
    star.style.height = "2px";
    star.style.background = "linear-gradient(90deg, transparent, rgba(212,175,55,.95), transparent)";
    star.style.top = `${Math.random() * 55}%`;
    star.style.left = `${Math.random() * 85}%`;
    star.style.zIndex = "6";
    star.style.pointerEvents = "none";
    star.style.transform = "rotate(-32deg)";
    star.style.opacity = "0";
    star.style.animation = "shooting 1.4s ease forwards";

    document.body.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 1500);
  }, 2800);
}

const style = document.createElement("style");
style.innerHTML = `
@keyframes shooting{
  0%{
    opacity:0;
    transform:translate(0,0) rotate(-32deg);
  }

  15%{
    opacity:1;
  }

  100%{
    opacity:0;
    transform:translate(520px,330px) rotate(-32deg);
  }
}
`;
document.head.appendChild(style);

window.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  mouseLight.style.left = `${x}px`;
  mouseLight.style.top = `${y}px`;

  const moveX = (x / window.innerWidth - 0.5) * 24;
  const moveY = (y / window.innerHeight - 0.5) * 24;

  if(heroBg){
    heroBg.style.transform = `scale(1.08) translate(${moveX * -0.35}px, ${moveY * -0.35}px)`;
  }

  if(heroContent){
    heroContent.style.transform = `translate(${moveX * -0.45}px, ${moveY * -0.45}px)`;
  }
});

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  if(scroll > 40){
    navbar.classList.add("navbar-active");
  }else{
    navbar.classList.remove("navbar-active");
  }

  if(heroContent){
    heroContent.style.opacity = Math.max(1 - scroll / 650, 0);
  }
});

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 18;
    const rotateY = (centerX - x) / 18;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-12px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});