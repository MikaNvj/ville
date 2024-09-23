const sections = document.querySelectorAll('section');
let isScrolling = false;

window.addEventListener('wheel', (event) => {
  if (isScrolling) return;

  isScrolling = true;

  // Trouver la section actuellement visible (celle qui est majoritairement visible)
  const currentSectionIndex = Array.from(sections).findIndex(section => {
    const rect = section.getBoundingClientRect();
    return rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
  });

  // Calculer la direction du scroll (vers le bas ou vers le haut)
  const delta = Math.sign(event.deltaY);

  let nextSectionIndex = currentSectionIndex + delta;

  // Empêcher de sortir des limites
  if (nextSectionIndex < 0) nextSectionIndex = 0;
  if (nextSectionIndex >= sections.length) nextSectionIndex = sections.length - 1;

  // Faire défiler vers la section suivante ou précédente
  window.scrollTo({
    top: sections[nextSectionIndex].offsetTop,
    behavior: 'smooth'
  });

  // Attendre que le défilement soit terminé avant d'en permettre un autre
  setTimeout(() => {
    isScrolling = false;
  }, 1000); // Ajuster le délai selon la vitesse de défilement souhaitée
});
