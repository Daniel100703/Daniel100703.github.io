/* Progressive enhancement: links, images, and all content work without JavaScript. */
(() => {
  const toggle = document.querySelector('#menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Buka menu navigasi');
  };
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    menu.hidden = expanded;
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.setAttribute('aria-label', expanded ? 'Buka menu navigasi' : 'Tutup menu navigasi');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) {
      closeMenu();
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 851px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  const filters = document.querySelector('.project-filters');
  const projectCards = [...document.querySelectorAll('[data-category]')];
  filters.hidden = false;
  filters.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filters.querySelectorAll('button').forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
      document.querySelectorAll('[data-project-group]').forEach(group => {
        group.hidden = ![...group.querySelectorAll('[data-category]')].some(card => !card.hidden);
      });
      document.querySelector('#project-count').textContent = `${projectCards.filter(card => !card.hidden).length} proyek ditampilkan.`;
    });
  });

  const search = document.querySelector('#certificate-search');
  const certificates = [...document.querySelectorAll('.certificate-item')];
  document.querySelector('.cert-search-wrap').hidden = false;
  const filterCertificates = () => {
    const term = search.value.trim().toLocaleLowerCase('id');
    certificates.forEach(card => { card.hidden = !card.dataset.search.includes(term); });
    const count = certificates.filter(card => !card.hidden).length;
    document.querySelector('#cert-count').textContent = count ? `${count} sertifikat dan badge ditampilkan.` : 'Tidak ada sertifikat yang cocok.';
  };
  search.addEventListener('input', filterCertificates);
  filterCertificates();

  const dialog = document.querySelector('#image-dialog');
  const image = document.querySelector('#preview-image');
  // Native dialog traps focus and restores it when closed; fallback is the image URL.
  if (typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-preview]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const caption = link.querySelector('img')?.alt || link.textContent.trim();
        image.src = link.href;
        image.alt = caption;
        document.querySelector('#preview-caption').textContent = caption;
        dialog.showModal();
        document.body.classList.add('preview-open');
      });
    });
    document.querySelector('#close-preview').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      }
    });
    dialog.addEventListener('close', () => { document.body.classList.remove('preview-open'); image.removeAttribute('src'); });
  }
})();
