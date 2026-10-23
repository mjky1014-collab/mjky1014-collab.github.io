(() => {
  'use strict';
  const doc = document;
  const root = doc.documentElement;
  root.classList.remove('no-js');

  const header = doc.getElementById('header');
  const progress = doc.getElementById('progress');
  const menuBtn = doc.getElementById('menu-btn');
  const navLinks = doc.getElementById('nav-links');

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 12);
    if (progress) {
      const max = doc.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = max > 0 ? `${Math.min(100, (y / max) * 100)}%` : '0%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (menuBtn && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', '메뉴 열기');
    };
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });
    navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
    doc.addEventListener('click', (event) => {
      if (!navLinks.classList.contains('open')) return;
      if (header && !header.contains(event.target)) closeMenu();
    });
    doc.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = Array.from(doc.querySelectorAll('.reveal'));
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('on'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('on');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));
    // Fallback for background/hidden tabs where IntersectionObserver may be throttled.
    window.setTimeout(() => revealEls.forEach((el) => el.classList.add('on')), 1800);
  }

  const navAnchors = Array.from(doc.querySelectorAll('.nav-links a[href^="#"]'));
  const navSections = navAnchors
    .map((a) => doc.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window && navSections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === id));
      });
    }, { rootMargin: '-42% 0px -52% 0px', threshold: 0 });
    navSections.forEach((section) => navObserver.observe(section));
  }

  // ---------- curriculum 25 : source-material modal ----------
  const curriculumButtons = Array.from(doc.querySelectorAll('[data-curriculum]'));
  const curriculumModal = doc.getElementById('curriculum-modal');
  const curriculumTitle = doc.getElementById('curriculum-modal-title');
  const curriculumKicker = doc.getElementById('curriculum-modal-kicker');
  const curriculumBody = doc.getElementById('curriculum-modal-body');
  const curriculumClose = curriculumModal ? curriculumModal.querySelector('.curriculum-modal-close') : null;
  const curriculumData = window.CURRICULUM_DATA || {};
  let curriculumTrigger = null;

  if (curriculumModal && curriculumTitle && curriculumKicker && curriculumBody && curriculumButtons.length) {
    const canShowModal = typeof curriculumModal.showModal === 'function';

    const openCurriculum = (key) => {
      const item = curriculumData[key];
      if (!item) return;

      curriculumKicker.textContent = `CURRICULUM ${key}${item.tag ? ` · ${item.tag}` : ''}`;
      curriculumTitle.textContent = item.title;

      const points = (item.points || []).map((point) => `<li>${point}</li>`).join('');
      const figures = (item.images || []).map((image) => `
        <figure class="curriculum-modal-figure">
          <img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async">
          <figcaption>${image.caption}</figcaption>
        </figure>`).join('');
      const video = item.video ? `
        <div class="curriculum-modal-video">
          <div><b>영상 참조</b>${item.video} <a href="#videos" data-modal-inner-link>영상 목록 보기 ↗</a></div>
        </div>` : '';
      const link = item.link ? `
        <a class="curriculum-modal-link" href="${item.link.href}" data-modal-inner-link>${item.link.label} <span aria-hidden="true">→</span></a>` : '';

      curriculumBody.innerHTML = `
        <p class="curriculum-modal-lead">제공된 강의자료에서 확인한 내용을 정리했습니다.</p>
        <ul class="curriculum-modal-points">${points}</ul>
        ${figures}
        ${video}
        <p class="curriculum-modal-source"><b>출처</b> ${item.source}</p>
        ${link}
        <p class="curriculum-modal-note">제공된 강의자료에서 발췌·재구성했습니다. 교육용이며 매매 권유가 아닙니다. 모든 판단과 책임은 본인에게 있습니다.</p>`;

      curriculumModal.scrollTop = 0;
      curriculumBody.scrollTop = 0;
      doc.body.classList.add('modal-open');
      if (canShowModal) curriculumModal.showModal();
      else curriculumModal.setAttribute('open', '');
    };

    const closeCurriculum = () => {
      if (canShowModal && curriculumModal.open) curriculumModal.close();
      else {
        curriculumModal.removeAttribute('open');
        doc.body.classList.remove('modal-open');
        if (curriculumTrigger) curriculumTrigger.focus();
      }
    };

    curriculumButtons.forEach((button) => {
      const key = button.getAttribute('data-curriculum');
      const label = button.querySelector('p')?.textContent.trim();
      if (label) button.setAttribute('aria-label', `${label} — 제공 자료 보기`);
      button.addEventListener('click', () => {
        curriculumTrigger = button;
        openCurriculum(key);
      });
    });

    if (curriculumClose) curriculumClose.addEventListener('click', closeCurriculum);

    curriculumModal.addEventListener('click', (event) => {
      if (event.target === curriculumModal) closeCurriculum();
      if (event.target.closest('[data-modal-inner-link]')) closeCurriculum();
    });

    curriculumModal.addEventListener('close', () => {
      doc.body.classList.remove('modal-open');
      if (curriculumTrigger) {
        curriculumTrigger.focus();
        curriculumTrigger = null;
      }
    });

    curriculumModal.addEventListener('cancel', () => {
      doc.body.classList.remove('modal-open');
    });
  }

})();
