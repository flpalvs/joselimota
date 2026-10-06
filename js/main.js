/* =============================================================
   Dra. Joseli Mota — Landing Page
   Interações: header on scroll, menu mobile, reveal on scroll,
   confirmação visual de clique no WhatsApp, ano do rodapé.
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Header com sombra ao rolar ----------
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });

  // ---------- Menu mobile ----------
  const menuBtn = document.getElementById('menuBtn');
  const menuClose = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');

  function openMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  menuBtn.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // ---------- Reveal on scroll (progressive enhancement) ----------
  document.documentElement.classList.remove('no-js');
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ---------- Confirmação visual de clique + hook de mensuração (WhatsApp) ----------
  document.querySelectorAll('[data-wa]').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.add('clicked');
      setTimeout(() => el.classList.remove('clicked'), 500);

      // Ponto de integração: evento de intenção de WhatsApp para GA4/GTM.
      // Não enviar dados pessoais, de saúde ou conteúdo digitado.
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'whatsapp_click',
          link_section: el.closest('section')?.id || 'header_footer'
        });
      }
    });
  });

  // ---------- FAQ: abertura e fechamento suaves ----------
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

  document.querySelectorAll('.faq-item').forEach(item => {
    const summary = item.querySelector('summary');
    const answer = item.querySelector('.faq-answer');
    let anim = null;
    let fade = null;

    const settle = (open) => {
      item.open = open;
      item.style.height = item.style.overflow = '';
      anim = fade = null;
    };

    const run = (opening) => {
      const startH = item.offsetHeight;
      anim && anim.cancel();
      fade && fade.cancel();
      item.style.overflow = 'hidden';
      item.style.height = startH + 'px';

      if (opening) item.open = true;
      const closedH = summary.offsetHeight + 2;
      const openH = summary.offsetHeight + answer.offsetHeight + 2;
      const endH = opening ? openH : closedH;

      anim = item.animate(
        { height: [startH + 'px', endH + 'px'] },
        { duration: opening ? 520 : 380, easing: EASE }
      );
      fade = answer.animate(
        opening
          ? { opacity: [0, 1], transform: ['translateY(-6px)', 'translateY(0)'] }
          : { opacity: [1, 0], transform: ['translateY(0)', 'translateY(-4px)'] },
        { duration: opening ? 480 : 240, delay: opening ? 90 : 0, easing: EASE, fill: 'both' }
      );
      anim.onfinish = () => { fade && fade.cancel(); settle(opening); };
      anim.oncancel = () => {};
    };

    summary.addEventListener('click', (e) => {
      if (reduceMotion.matches || !item.animate) return;
      e.preventDefault();
      if (e.detail > 0) summary.blur(); // clique de mouse: sem anel de foco (teclado mantém)
      const willOpen = !item.open || (anim && anim.playState === 'running' && item.dataset.closing === '1');
      item.dataset.closing = willOpen ? '' : '1';
      run(willOpen);
    });
  });

  // ---------- Ano dinâmico no rodapé ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Placeholder da Política de Privacidade ----------
  const privacyLink = document.getElementById('privacyLink');
  if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Política de Privacidade em publicação.');
    });
  }

});
