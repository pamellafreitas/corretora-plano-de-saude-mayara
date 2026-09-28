document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.toggle('hidden');
    });
  }

  // Prevent default submit on forms
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  });

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
