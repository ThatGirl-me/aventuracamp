// Shared header and footer for all pages
(function() {
  const path = window.location.pathname;
  const href = window.location.href;
  
  // Check if we're in a subpage by looking for pages folder OR specific filenames
  const inPagesFolder = path.includes('/pages/') || path.includes('\\pages\\') || 
                        href.includes('/pages/') || href.includes('\\pages\\');
  
  // For root: prefix='', pagesPrefix='pages/'
  // For pages folder: prefix='../', pagesPrefix=''
  const prefix = inPagesFolder ? '../' : '';
  
  // Get current page for active state
  const currentPage = path.includes('features') ? 'features' 
    : path.includes('setup') ? 'setup'
    : path.includes('docs') ? 'docs'
    : 'home';
  
  // Navigation links - always point to pages folder from root, or relative from pages
  const navLinks = {
    home: inPagesFolder ? '../index.html' : 'index.html',
    features: inPagesFolder ? 'features.html' : 'pages/features.html',
    setup: inPagesFolder ? 'setup.html' : 'pages/setup.html',
    docs: inPagesFolder ? 'docs.html' : 'pages/docs.html'
  };
  
  function getNavClass(page) {
    return page === currentPage 
      ? 'text-primary' 
      : 'text-text-muted hover:text-primary';
  }
  
  // Header HTML
  const headerHTML = `
<header class="w-full border-b border-solid border-border-brown bg-background-dark/95 backdrop-blur-sm sticky top-0 z-50">
  <div class="mx-auto max-w-7xl px-5 sm:px-10 py-4 flex items-center justify-between">
    <a href="${navLinks.home}" class="flex items-center gap-3 text-text-cream hover:opacity-90 transition-opacity">
      <img src="${prefix}images/logo.png" alt="Aventura" class="w-8 h-8">
      <h2 class="text-2xl font-bold tracking-tight text-text-cream">Aventura</h2>
    </a>
    <nav class="hidden md:flex items-center gap-8">
      <a href="${navLinks.home}" class="text-sm font-medium font-body transition-colors ${getNavClass('home')}">Home</a>
      <a href="${navLinks.features}" class="text-sm font-medium font-body transition-colors ${getNavClass('features')}">Features</a>
      <a href="${navLinks.setup}" class="text-sm font-medium font-body transition-colors ${getNavClass('setup')}">Setup</a>
      <a href="${navLinks.docs}" class="text-sm font-medium font-body transition-colors ${getNavClass('docs')}">Docs</a>
      <a href="https://github.com/unkarelian/Aventura" target="_blank" rel="noopener noreferrer" class="text-sm font-medium font-body transition-colors text-text-muted hover:text-primary">
        GitHub <span class="material-symbols-outlined text-xs ml-1 align-middle">open_in_new</span>
      </a>
    </nav>
    <button class="md:hidden text-text-muted hover:text-primary transition-colors" id="mobile-menu-btn" aria-label="Toggle menu">
      <span class="material-symbols-outlined text-2xl">menu</span>
    </button>
  </div>
  <nav class="hidden md:hidden border-t border-border-brown bg-background-dark" id="mobile-menu">
    <div class="px-5 py-4 flex flex-col gap-4">
      <a href="${navLinks.home}" class="text-base font-medium font-body transition-colors py-2 ${getNavClass('home')}">Home</a>
      <a href="${navLinks.features}" class="text-base font-medium font-body transition-colors py-2 ${getNavClass('features')}">Features</a>
      <a href="${navLinks.setup}" class="text-base font-medium font-body transition-colors py-2 ${getNavClass('setup')}">Setup</a>
      <a href="${navLinks.docs}" class="text-base font-medium font-body transition-colors py-2 ${getNavClass('docs')}">Docs</a>
      <a href="https://github.com/unkarelian/Aventura" target="_blank" rel="noopener noreferrer" class="text-base font-medium font-body transition-colors py-2 text-text-muted hover:text-primary">
        GitHub <span class="material-symbols-outlined text-xs ml-1 align-middle">open_in_new</span>
      </a>
    </div>
  </nav>
</header>`;

  // Footer HTML
  const footerHTML = `
<footer class="w-full border-t border-border-brown bg-background-dark mt-auto">
  <div class="max-w-7xl mx-auto px-5 sm:px-10 py-12">
    <div class="flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex flex-col items-center md:items-start gap-2">
        <a href="${navLinks.home}" class="flex items-center gap-2 text-text-cream hover:opacity-90 transition-opacity">
          <img src="${prefix}images/logo.png" alt="Aventura" class="w-6 h-6">
          <span class="font-bold text-xl">Aventura</span>
        </a>
        <p class="text-text-muted text-sm font-body">&copy; 2026 Aventura. Open Source under AGPL-3.0.</p>
      </div>
      <div class="flex items-center gap-8 font-body">
        <a href="${navLinks.features}" class="text-text-muted hover:text-primary transition-colors text-sm">Features</a>
        <a href="${navLinks.docs}" class="text-text-muted hover:text-primary transition-colors text-sm">Documentation</a>
        <a href="https://github.com/unkarelian/Aventura/blob/main/LICENSE.md" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-primary transition-colors text-sm">License</a>
      </div>
      <div class="flex gap-4">
        <a href="https://github.com/unkarelian/Aventura" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-surface-dark border border-border-brown flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all" aria-label="GitHub">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://discord.gg/SyGGcXjbR6" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-surface-dark border border-border-brown flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all" aria-label="Discord">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>
        </a>
      </div>
    </div>
  </div>
</footer>`;

  // Inject header
  const headerEl = document.getElementById('header-include');
  if (headerEl) {
    headerEl.outerHTML = headerHTML;
  }
  
  // Inject footer
  const footerEl = document.getElementById('footer-include');
  if (footerEl) {
    footerEl.outerHTML = footerHTML;
  }
  
  // Mobile menu toggle (needs to run after header is injected)
  setTimeout(() => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn?.addEventListener('click', () => {
      mobileMenu?.classList.toggle('hidden');
      const icon = menuBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = mobileMenu?.classList.contains('hidden') ? 'menu' : 'close';
      }
    });
  }, 0);
})();