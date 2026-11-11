/* Keep the navigation, projects, and image links usable without JavaScript. */
(() => {
  const toggle = document.querySelector('#menu-toggle');
  const menu = document.querySelector('#site-menu');
  const mobile = window.matchMedia('(max-width: 850px)');

  const setMenu = expanded => {
    menu.hidden = mobile.matches && !expanded;
    toggle.setAttribute('aria-expanded', String(expanded));
  };
  const syncMenu = () => {
    const focusedInsideMenu = menu.contains(document.activeElement);
    toggle.hidden = !mobile.matches;
    setMenu(false);
    if (mobile.matches && focusedInsideMenu) toggle.focus();
  };

  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !mobile.matches) return;
    setMenu(false);
    const section = document.querySelector(link.hash);
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && !menu.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });
  mobile.addEventListener('change', syncMenu);
  syncMenu();

  const navLinks = [...menu.querySelectorAll('a')];
  const sections = [...document.querySelectorAll('main > section')];
  const updateActiveSection = () => {
    const atBottom = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight;
    const current = atBottom ? sections.at(-1) : sections.findLast(section => section.getBoundingClientRect().top <= 120);
    navLinks.forEach(link => {
      if (link.hash === '#' + current?.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  let pendingScroll = false;
  window.addEventListener('scroll', () => {
    if (pendingScroll) return;
    pendingScroll = true;
    requestAnimationFrame(() => {
      pendingScroll = false;
      updateActiveSection();
    });
  }, { passive: true });
  updateActiveSection();

  const filters = document.querySelector('.project-filters');
  const buttons = [...filters.querySelectorAll('button')];
  const groups = [...document.querySelectorAll('[data-project-group]')].map(group => ({
    group,
    cards: [...group.querySelectorAll('[data-category]')],
  }));
  const projectCount = document.querySelector('#project-count');
  const filterProjects = selected => {
    const category = selected.dataset.filter;
    let count = 0;
    buttons.forEach(button => {
      const active = button === selected;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    groups.forEach(({ group, cards }) => {
      cards.forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
      });
      const visible = cards.filter(card => !card.hidden).length;
      group.hidden = visible === 0;
      count += visible;
    });
    projectCount.textContent = count + ' proyek';
  };
  buttons.forEach(button => button.addEventListener('click', () => filterProjects(button)));
  filters.hidden = false;
  filterProjects(buttons[0]);

  const search = document.querySelector('#certificate-search');
  const certificates = [...document.querySelectorAll('.certificate-item')];
  const certCount = document.querySelector('#cert-count');
  const filterCertificates = () => {
    const terms = search.value.trim().toLocaleLowerCase('id').split(/\s+/);
    certificates.forEach(card => {
      card.hidden = !terms.every(term => card.dataset.search.includes(term));
    });
    const count = certificates.filter(card => !card.hidden).length;
    certCount.textContent = count ? count + ' sertifikat dan badge' : 'Tidak ada sertifikat yang cocok.';
  };
  search.addEventListener('input', filterCertificates);
  document.querySelector('.cert-search-wrap').hidden = false;
  filterCertificates();

  const dialog = document.querySelector('#image-dialog');
  if (typeof dialog.showModal !== 'function') return;

  const image = document.querySelector('#preview-image');
  const caption = document.querySelector('#preview-caption');
  const footer = dialog.querySelector('.dialog-footer');
  const count = document.querySelector('#preview-count');
  let gallery = [];
  let index = 0;

  const renderImage = () => {
    const link = gallery[index];
    const thumbnail = link.querySelector('img');
    caption.textContent = link.closest('figure')?.querySelector('figcaption')?.textContent.trim() ||
      thumbnail?.alt || link.textContent.trim();
    image.alt = thumbnail?.alt || caption.textContent;
    image.src = link.href;
    footer.hidden = gallery.length < 2;
    count.textContent = (index + 1) + ' dari ' + gallery.length;
  };
  const step = direction => {
    if (gallery.length < 2) return;
    index = (index + direction + gallery.length) % gallery.length;
    renderImage();
  };

  document.querySelectorAll('[data-preview]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const container = link.closest('.project-card, .intern-gallery, .danimoan-showcase');
      const images = [...(container?.querySelectorAll('[data-preview]') ?? [link])];
      // Several projects link to the same image from both their cover and details.
      const unique = new Map();
      images.forEach(item => {
        if (!unique.has(item.href)) unique.set(item.href, item);
      });
      gallery = [...unique.values()];
      index = gallery.findIndex(item => item.href === link.href);
      renderImage();
      dialog.showModal();
      document.body.classList.add('preview-open');
    });
  });
  document.querySelector('#preview-prev').addEventListener('click', () => step(-1));
  document.querySelector('#preview-next').addEventListener('click', () => step(1));
  document.querySelector('#close-preview').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('preview-open');
    image.removeAttribute('src');
  });
})();
