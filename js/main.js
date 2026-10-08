document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.toggle('hidden');
    });
  }

  // Remove preventDefault that was blocking all forms
  // Web3Forms will handle submissions natively when you add the keys


  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
