(function() {
  const HEADER_HTML = `
<nav class="top">
  <a href="index" class="nav-mark"><img src="logos/mediak9.png" alt="Media K9"></a>
  <ul class="nav-list">
    <li><a href="index" data-nav="home">Home</a></li>
    <li><a href="work" data-nav="work">Work</a></li>
    <li><a href="services" data-nav="services">Services</a></li>
    <li><a href="studio" data-nav="studio">Studio</a></li>
    <li><a href="launchpad" data-nav="launchpad">Launchpad</a></li>
    <li><a href="contact" data-nav="contact">Contact</a></li>
  </ul>
  <a href="contact" class="nav-cta">Start a project →</a>
</nav>
`;

  const FOOTER_HTML = `
<div class="f-top">
  <div class="f-mark">
    <img src="logos/mediak9.png" alt="Media K9">
    <h3>An Islamabad studio building brands that <span class="accent">compound</span>.</h3>
    <p>We engineer the small details until they add up to something undeniable. Strategy, design, and growth — under one roof, for a small list of partners we believe in.</p>
  </div>
  <div class="f-col">
    <h4>Site</h4>
    <a href="index">Home</a>
    <a href="work">Work</a>
    <a href="services">Services</a>
    <a href="studio">Studio</a>
    <a href="launchpad">Launchpad</a>
    <a href="contact">Contact</a>
  </div>
  <div class="f-col">
    <h4>Services</h4>
    <a href="service-brand-strategy">Brand strategy</a>
    <a href="service-social-content">Social & content</a>
    <a href="service-performance-ads">Performance ads</a>
    <a href="service-web-product">Web & product</a>
    <a href="service-crm-lifecycle">CRM & lifecycle</a>
  </div>
  <div class="f-col">
    <h4>Reach us</h4>
    <a href="mailto:mediak997@gmail.com">mediak997@gmail.com</a>
    <a href="tel:+923345441307">+92 334 5441307</a>
    <p style="color:var(--cream-dim);margin-top:10px;font-size:12px;line-height:1.55">Office #16, Green Plaza,<br>G-9 Markaz, Islamabad</p>
  </div>
</div>
<div class="f-giant">
  <span>Media <span class="accent">K9</span></span>
  <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.15em;color:var(--cream-muted);text-transform:uppercase;font-weight:500;line-height:1.5">Est. Islamabad<br>2019 — 2026</span>
</div>
<div class="f-bot">
  <span>© 2026 Media K9. Crafted with care.</span>
  <span>Made in Islamabad</span>
</div>
`;

  document.addEventListener("DOMContentLoaded", () => {
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");
    const isLocal = window.location.protocol === 'file:';

    // Helper to append .html on local filesystem preview
    const adjustLinks = (container) => {
      if (isLocal) {
        container.querySelectorAll('a[href]').forEach(a => {
          const href = a.getAttribute('href');
          if (href && !href.startsWith('http') && !href.startsWith('#') && !href.includes('.') && !href.endsWith('/')) {
            a.setAttribute('href', href + '.html');
          }
        });
      }
    };

    // Helper to hook custom cursor ring hover styles
    const hookCursorEffects = (container) => {
      const ring = document.querySelector('.cur-ring');
      if (ring) {
        container.querySelectorAll('a, button').forEach(el => {
          el.addEventListener('mouseenter', () => ring.classList.add('h'));
          el.addEventListener('mouseleave', () => ring.classList.remove('h'));
        });
      }
    };

    // Load Header
    if (headerPlaceholder) {
      headerPlaceholder.innerHTML = HEADER_HTML;
      adjustLinks(headerPlaceholder);
      hookCursorEffects(headerPlaceholder);

      // Highlight Active Link based on data-page
      const page = document.body.getAttribute("data-page");
      if (page) {
        const activeLink = headerPlaceholder.querySelector(`.nav-list a[data-nav="${page}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    }

    // Load Footer
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = FOOTER_HTML;
      adjustLinks(footerPlaceholder);
      hookCursorEffects(footerPlaceholder);
    }
  });
})();
