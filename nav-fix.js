/**
 * nav-fix.js — universal nav for StockPilot
 * One consistent nav: Logo | Links center | Sign In + CTA right
 * Applies to: /trade, /app, /learn, /budget (NOT / or /bullpen)
 */
(function () {
  var path = window.location.pathname;
  // Skip landing and bullpen (they have their own navs)
  if (path === '/' || path === '' || path.includes('bullpen')) return;

  var isDark = path.startsWith('/trade');
  var isApp  = path.startsWith('/app');

  // ── Colors ──
  var bg       = isDark ? '#0d1117'   : '#ffffff';
  var border   = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  var logoCol  = isDark ? '#ffffff'   : '#111111';
  var linkCol  = isDark ? 'rgba(255,255,255,0.6)'  : 'rgba(0,0,0,0.55)';
  var linkHov  = isDark ? '#ffffff'   : '#111111';
  var activeBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  var activeCol= isDark ? '#ffffff'   : '#111111';
  var mobBg    = isDark ? 'rgba(8,12,16,0.98)' : 'rgba(255,255,255,0.98)';

  // ── Nav links ──
  var links = [
    { href: '/trade',        label: 'Virtual Market' },
    { href: '/app',          label: 'Portfolio'       },
    { href: '/budget',       label: 'Budget'          },
    { href: '/learn',        label: 'Learn'           },
    { href: '/bullpen.html', label: '🏟️ Bullpen'     },
  ];

  // Active link detection
  function isActive(href) {
    if (href === '/trade')  return path.startsWith('/trade');
    if (href === '/app')    return path.startsWith('/app');
    if (href === '/budget') return path.startsWith('/budget');
    if (href === '/learn')  return path.startsWith('/learn');
    return false;
  }

  // ── Inject CSS ──
  if (!document.getElementById('sp-nav-css')) {
    var style = document.createElement('style');
    style.id = 'sp-nav-css';
    style.textContent = `
      #sp-universal-nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 10000;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 24px; height: 56px;
        background: ${bg}; border-bottom: 1px solid ${border};
        font-family: 'DM Sans', sans-serif;
      }
      #sp-nav-logo {
        display: flex; align-items: center; gap: 8px;
        text-decoration: none; flex-shrink: 0;
      }
      #sp-nav-logo img { height: 26px; width: 26px; border-radius: 6px; }
      #sp-nav-logo-text {
        font-size: 15px; font-weight: 700; color: ${logoCol};
        letter-spacing: -0.3px;
      }
      #sp-nav-badge {
        font-size: 9px; font-weight: 700; letter-spacing: 1px;
        padding: 2px 7px; border-radius: 4px; text-transform: uppercase;
      }
      #sp-nav-center {
        display: flex; align-items: center; gap: 2px;
        position: absolute; left: 50%; transform: translateX(-50%);
      }
      .sp-nav-link {
        font-size: 13px; font-weight: 500; text-decoration: none;
        padding: 6px 12px; border-radius: 8px;
        color: ${linkCol}; transition: all 0.15s; white-space: nowrap;
      }
      .sp-nav-link:hover { color: ${linkHov}; background: ${activeBg}; }
      .sp-nav-link.active { color: ${activeCol}; background: ${activeBg}; font-weight: 600; }
      #sp-nav-right {
        display: flex; align-items: center; gap: 8px; flex-shrink: 0;
      }
      .sp-nav-sign-in {
        font-size: 13px; font-weight: 600; padding: 7px 14px;
        border-radius: 8px; cursor: pointer; font-family: 'DM Sans', sans-serif;
        background: transparent; border: 1px solid ${border};
        color: ${linkCol}; transition: all 0.15s;
      }
      .sp-nav-sign-in:hover { color: ${linkHov}; border-color: ${linkHov}; }
      .sp-nav-cta {
        font-size: 13px; font-weight: 700; padding: 7px 16px;
        border-radius: 8px; cursor: pointer; font-family: 'DM Sans', sans-serif;
        border: none; transition: all 0.15s;
      }
      .sp-nav-user {
        font-size: 12px; padding: 5px 10px; border-radius: 7px;
        background: ${activeBg}; color: ${linkCol};
        border: 1px solid ${border};
      }
      /* Hamburger */
      #sp-hamburger {
        display: none; background: none; border: none;
        cursor: pointer; padding: 6px; color: ${logoCol};
      }
      /* Mobile menu */
      #sp-mobile-menu {
        display: none; position: fixed; top: 56px; left: 0; right: 0;
        background: ${mobBg}; border-bottom: 1px solid ${border};
        backdrop-filter: blur(16px); z-index: 999;
        flex-direction: column; padding: 12px 16px 16px; gap: 4px;
      }
      #sp-mobile-menu .sp-mob-link {
        display: block; font-size: 15px; font-weight: 500;
        color: ${linkCol}; text-decoration: none;
        padding: 12px 14px; border-radius: 8px;
        transition: background 0.15s;
      }
      #sp-mobile-menu .sp-mob-link:hover,
      #sp-mobile-menu .sp-mob-link.active { background: ${activeBg}; color: ${linkHov}; }
      #sp-mobile-menu .sp-mob-divider {
        height: 1px; background: ${border}; margin: 8px 0;
      }
      #sp-mobile-menu .sp-mob-auth {
        display: flex; gap: 8px; padding: 4px 0;
      }
      /* Push page content below fixed nav */
      body { padding-top: 56px; }
      /* Hide original site header nav only */
      .sp-site-header { display: none !important; }
      /* Responsive */
      @media (max-width: 768px) {
        #sp-nav-center { display: none !important; }
        #sp-nav-right .sp-nav-sign-in,
        #sp-nav-right .sp-nav-cta,
        #sp-nav-right .sp-nav-user { display: none !important; }
        #sp-hamburger { display: flex !important; align-items: center; justify-content: center; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── Build nav ──
  function buildNav() {
    if (document.getElementById('sp-universal-nav')) return;

    var name = localStorage.getItem('supabase_name');
    var token = localStorage.getItem('supabase_token');
    var isSignedIn = !!(token && name);

    // Badge config per page
    var badges = {
      '/trade': { text: 'TRADE', bg: 'rgba(255,23,68,0.15)', col: '#ff1744' },
      '/app':   { text: 'APP',   bg: 'rgba(0,230,118,0.15)', col: '#00e676' },
      '/learn': { text: 'LEARN', bg: 'rgba(139,92,246,0.15)', col: '#8b5cf6' },
      '/budget':{ text: 'BUDGET',bg: 'rgba(59,130,246,0.15)', col: '#3b82f6' },
    };
    var badgeKey = Object.keys(badges).find(k => path.startsWith(k));
    var badge = badgeKey ? badges[badgeKey] : null;

    // CTA config per page
    var ctas = {
      '/trade':  { text: 'Reset', id: 'sp-nav-reset', bg: 'rgba(255,255,255,0.06)', col: 'rgba(255,255,255,0.4)', action: function(){ var b=document.getElementById('resetBtn'); if(b) b.click(); } },
      '/app':    null,
      '/learn':  null,
      '/budget': null,
    };
    var cta = Object.keys(ctas).find(k => path.startsWith(k));
    var ctaConfig = cta ? ctas[cta] : null;

    // Build center links
    var centerHTML = links.map(function(l) {
      var active = isActive(l.href);
      return '<a href="' + l.href + '" class="sp-nav-link' + (active ? ' active' : '') + '">' + l.label + '</a>';
    }).join('');

    // Build right side
    var rightHTML = '';
    if (isSignedIn) {
      rightHTML += '<span class="sp-nav-user">👤 ' + name + '</span>';
      if (isApp || isDark) {
        rightHTML += '<button class="sp-nav-sign-in" onclick="if(typeof signOut===\'function\')signOut();else{localStorage.removeItem(\'supabase_token\');localStorage.removeItem(\'supabase_name\');location.reload()}">Sign Out</button>';
      }
    } else {
      rightHTML += '<button class="sp-nav-sign-in" onclick="if(typeof openSignin===\'function\')openSignin()">Sign In</button>';
    }
    if (ctaConfig) {
      rightHTML += '<button class="sp-nav-cta" id="' + ctaConfig.id + '" style="background:' + ctaConfig.bg + ';color:' + ctaConfig.col + '">' + ctaConfig.text + '</button>';
    }

    // Mobile menu HTML
    var mobLinks = links.map(function(l) {
      return '<a href="' + l.href + '" class="sp-mob-link' + (isActive(l.href) ? ' active' : '') + '">' + l.label + '</a>';
    }).join('');
    var mobAuth = '';
    if (isSignedIn) {
      mobAuth = '<div style="padding:10px 14px;font-size:13px;font-weight:600;color:#00e676">👤 ' + name + '</div>';
      mobAuth += '<a href="#" class="sp-mob-link" onclick="if(typeof signOut===\'function\')signOut();else{localStorage.removeItem(\'supabase_token\');localStorage.removeItem(\'supabase_name\');location.reload()}" style="color:rgba(255,255,255,0.4)">Sign Out</a>';
    } else {
      mobAuth = '<a href="#" class="sp-mob-link" onclick="if(typeof openSignin===\'function\')openSignin();document.getElementById(\'sp-mobile-menu\').style.display=\'none\'" style="font-weight:700">Sign In</a>';
    }
    if (ctaConfig) {
      mobAuth += '<a href="#" class="sp-mob-link" onclick="(' + ctaConfig.action.toString() + ')()" style="opacity:0.4;font-size:13px">' + ctaConfig.text + '</a>';
    }

    // Create nav element
    var nav = document.createElement('nav');
    nav.id = 'sp-universal-nav';
    nav.innerHTML = `
      <a href="/" id="sp-nav-logo">
        <img src="/logo.jpg" alt="StockPilot" />
        <span id="sp-nav-logo-text">StockPilot</span>
        ${badge ? '<span id="sp-nav-badge" style="background:' + badge.bg + ';color:' + badge.col + '">' + badge.text + '</span>' : ''}
      </a>
      <div id="sp-nav-center">${centerHTML}</div>
      <div id="sp-nav-right">${rightHTML}</div>
      <button id="sp-hamburger" aria-label="Menu" onclick="toggleSpMenu()">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect y="4" width="22" height="2" rx="1" fill="${logoCol}"/>
          <rect y="10" width="22" height="2" rx="1" fill="${logoCol}"/>
          <rect y="16" width="22" height="2" rx="1" fill="${logoCol}"/>
        </svg>
      </button>
    `;

    // Create mobile menu
    var mob = document.createElement('div');
    mob.id = 'sp-mobile-menu';
    mob.innerHTML = mobLinks + '<div class="sp-mob-divider"></div>' + mobAuth;

    document.body.insertBefore(nav, document.body.firstChild);
    document.body.insertBefore(mob, nav.nextSibling);

    // Hook up reset button
    if (ctaConfig && ctaConfig.id === 'sp-nav-reset') {
      var resetBtn = document.getElementById('sp-nav-reset');
      if (resetBtn) resetBtn.addEventListener('click', ctaConfig.action);
    }
  }

  // ── Mobile menu toggle ──
  window.toggleSpMenu = function() {
    var menu = document.getElementById('sp-mobile-menu');
    if (!menu) return;
    var open = menu.style.display === 'flex';
    menu.style.display = open ? 'none' : 'flex';
  };

  document.addEventListener('click', function(e) {
    var menu = document.getElementById('sp-mobile-menu');
    var btn = document.getElementById('sp-hamburger');
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
      menu.style.display = 'none';
    }
  });

  // ── Run ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    setTimeout(buildNav, 50);
  }

  // Update nav auth state after sign-in
  window.updateNavAuth = function() {
    // Rebuild right side with new auth state
    var right = document.getElementById('sp-nav-right');
    var mob = document.getElementById('sp-mobile-menu');
    if (!right) return;
    var name = localStorage.getItem('supabase_name');
    var token = localStorage.getItem('supabase_token');
    var isSignedIn = !!(token && name);
    if (isSignedIn) {
      right.innerHTML = '<span class="sp-nav-user">👤 ' + name + '</span><button class="sp-nav-sign-in" onclick="if(typeof signOut===\'function\')signOut();else{localStorage.removeItem(\'supabase_token\');localStorage.removeItem(\'supabase_name\');location.reload()}">Sign Out</button>';
    }
  };

})();
