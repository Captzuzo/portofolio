window.addEventListener('scroll', () => {
  document.querySelectorAll('.about, .skills, .portfolio, .contact').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('show');
    }
  });
});
