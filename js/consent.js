/* =============================================================
   Dra. Joseli Mota — Aviso de cookies (LGPD) + Google Consent Mode v2
   Carregado no <head>, ANTES do snippet do Google Tag Manager.
   - Começa com tudo negado (exceto o necessário para o site funcionar).
   - Guarda a escolha da pessoa no navegador (localStorage).
   - Atualiza o consentimento do Google e avisa o GTM pelo dataLayer.
   ============================================================= */
(function () {
  'use strict';

  var KEY = 'jm_cookie_consent';
  var VERSION = 1;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  if (!window.gtag) window.gtag = gtag;

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      return v && v.version === VERSION ? v : null;
    } catch (e) { return null; }
  }
  function save(choice) {
    var v = { version: VERSION, analytics: !!choice.analytics, ads: !!choice.ads, date: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
    return v;
  }
  function toConsent(c) {
    var a = c && c.analytics ? 'granted' : 'denied';
    var d = c && c.ads ? 'granted' : 'denied';
    return { analytics_storage: a, ad_storage: d, ad_user_data: d, ad_personalization: d };
  }

  var saved = read();
  var defaults = toConsent(saved);
  defaults.functionality_storage = 'granted';
  defaults.security_storage = 'granted';
  if (!saved) defaults.wait_for_update = 500;
  gtag('consent', 'default', defaults);
  if (saved) {
    window.dataLayer.push({ event: 'consent_ready', consent_analytics: saved.analytics, consent_ads: saved.ads });
  }

  /* ---------- Interface ---------- */
  var root, panel, inAnalytics, inAds;

  function apply(choice) {
    var v = save(choice);
    gtag('consent', 'update', toConsent(v));
    window.dataLayer.push({ event: 'consent_update', consent_analytics: v.analytics, consent_ads: v.ads });
    hide();
  }

  function build() {
    var policy = document.body.classList.contains('legal-page') ? '#mensuracao' : 'politica-de-privacidade.html#mensuracao';
    root = document.createElement('div');
    root.className = 'cookie-banner';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-live', 'polite');
    root.setAttribute('aria-labelledby', 'cookieTitle');
    root.innerHTML =
      '<div class="cookie-main">' +
        '<p class="cookie-title" id="cookieTitle">Sua privacidade</p>' +
        '<p class="cookie-text">Usamos cookies para medir visitas e cliques e entender como melhorar o site. Eles só são ativados se você permitir, e nenhuma informação de saúde é coletada. Saiba mais na <a href="' + policy + '">Política de Privacidade</a>.</p>' +
      '</div>' +
      '<div class="cookie-panel" id="cookiePanel" hidden>' +
        '<div class="cookie-option">' +
          '<div><strong>Necessários</strong><span>Guardam apenas a sua escolha sobre cookies. Sempre ativos.</span></div>' +
          '<span class="cookie-always">Sempre ativo</span>' +
        '</div>' +
        '<label class="cookie-option">' +
          '<div><strong>Mensuração</strong><span>Contam visitas e cliques de forma agregada, como no Google Analytics.</span></div>' +
          '<input type="checkbox" role="switch" id="cookieAnalytics"><span class="cookie-switch" aria-hidden="true"></span>' +
        '</label>' +
        '<label class="cookie-option">' +
          '<div><strong>Anúncios</strong><span>Medem o resultado de anúncios do Google e de redes sociais.</span></div>' +
          '<input type="checkbox" role="switch" id="cookieAds"><span class="cookie-switch" aria-hidden="true"></span>' +
        '</label>' +
      '</div>' +
      '<div class="cookie-actions">' +
        '<button type="button" class="cookie-btn cookie-btn--link" data-cookie="custom" aria-expanded="false" aria-controls="cookiePanel">Personalizar</button>' +
        '<button type="button" class="cookie-btn cookie-btn--outline" data-cookie="reject">Recusar</button>' +
        '<button type="button" class="cookie-btn cookie-btn--solid" data-cookie="accept">Aceitar</button>' +
      '</div>';
    document.body.appendChild(root);

    panel = root.querySelector('#cookiePanel');
    inAnalytics = root.querySelector('#cookieAnalytics');
    inAds = root.querySelector('#cookieAds');
    var customBtn = root.querySelector('[data-cookie="custom"]');

    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cookie]');
      if (!btn) return;
      var action = btn.getAttribute('data-cookie');
      if (action === 'accept') apply({ analytics: true, ads: true });
      else if (action === 'reject') apply({ analytics: false, ads: false });
      else if (action === 'save') apply({ analytics: inAnalytics.checked, ads: inAds.checked });
      else if (action === 'custom') openPanel();
    });

    function openPanel() {
      panel.hidden = false;
      root.classList.add('is-custom');
      customBtn.setAttribute('aria-expanded', 'true');
      customBtn.textContent = 'Salvar escolhas';
      customBtn.setAttribute('data-cookie', 'save');
    }
    root._openPanel = openPanel;
  }

  function show(withPanel) {
    if (!root) build();
    var c = read();
    inAnalytics.checked = !!(c && c.analytics);
    inAds.checked = !!(c && c.ads);
    root.classList.add('is-visible');
    if (withPanel) root._openPanel();
  }
  function hide() {
    if (root) root.classList.remove('is-visible');
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!read()) show(false);
    document.querySelectorAll('[data-cookie-prefs]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); show(true); });
    });
  });
})();
