/**
 * PlantaLivre App Theme - iOS
 */

(function() {
  'use strict';

  window.PLANTALIVRE_APP = true;
  window.PLANTALIVRE_PLATFORM = 'ios';

  console.log('[PlantaLivre App] iOS theme injected');

  const hideInApp = () => {
    const selectors = [];
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.style.display = 'none');
    });
  };

  const injectStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      body {
        overscroll-behavior: none;
        -webkit-overflow-scrolling: touch;
      }
      .app-header { padding-top: env(safe-area-inset-top); }
      .app-footer { padding-bottom: env(safe-area-inset-bottom); }
      ::-webkit-scrollbar { width: 0px; }
      * { -webkit-tap-highlight-color: transparent; }
    `;
    document.head.appendChild(style);
  };

  const hasBridge = typeof window.webkit !== 'undefined' && 
                    typeof window.webkit.messageHandlers !== 'undefined' &&
                    typeof window.webkit.messageHandlers.iOSBridge !== 'undefined';
  
  if (hasBridge) {
    console.log('[PlantaLivre App] iOSBridge available');
  }

  window.PlantaLivreApp = {
    isApp: true,
    platform: 'ios',
    
    openExternal: (url) => {
      if (hasBridge) {
        window.webkit.messageHandlers.iOSBridge.postMessage({
          action: 'openExternal',
          url: url
        });
      } else {
        window.open(url, '_blank');
      }
    },

    share: (title, text, url) => {
      if (hasBridge) {
        window.webkit.messageHandlers.iOSBridge.postMessage({
          action: 'share',
          title: title,
          text: text,
          url: url
        });
      } else if (navigator.share) {
        navigator.share({ title, text, url });
      }
    },

    toast: (message) => {
      if (hasBridge) {
        window.webkit.messageHandlers.iOSBridge.postMessage({
          action: 'toast',
          message: message
        });
      }
    },

    getVersion: () => {
      if (hasBridge) {
        window.webkit.messageHandlers.iOSBridge.postMessage({
          action: 'getVersion'
        });
      }
      return '1.0.0';
    }
  };

  const interceptExternalLinks = () => {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;
      if (href.startsWith('http') && !href.includes('plantalivre.pt')) {
        e.preventDefault();
        window.PlantaLivreApp.openExternal(href);
      }
    }, true);
  };

  const initialize = () => {
    hideInApp();
    injectStyles();
    interceptExternalLinks();
    console.log('[PlantaLivre App] Initialization complete');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();
