# PlantaLivre.pt - iOS App

WebView wrapper nativo para https://plantalivre.pt

## 🎯 Configurações Fixas

```
SITE_URL=https://plantalivre.pt
DISABLE_ZOOM=true
USER_AGENT="PlantalivreApp/1.0"
MIN_IOS_VERSION=15.0
```

## 📱 Funcionalidades Implementadas

- ✅ WKWebView com plantalivre.pt
- ✅ Zoom desativado
- ✅ User Agent customizado
- ✅ Interceptação de URLs (Safari)
- ✅ Injeção JS (app-theme.js)
- ✅ JavaScript Bridge
- ✅ Pull to refresh
- ✅ Progress bar
- ✅ Safe area support
- 🟡 Push notifications (APNs)
- 🟡 Ícones da app

## 🚀 Quick Start

```bash
git clone https://github.com/pedroalvarezpt/website-app-ios.git
cd website-app-ios
open ios/PlantaLivre.xcodeproj
# Cmd+R to run
```

## 📚 Documentação

- [Development Log](docs/development-log.md)
- [App Store Guide](docs/appstore-guide.md)
- [APNs Setup](ios/APNS_SETUP.md)
- [Icon Instructions](ios/ICON_INSTRUCTIONS.md)

## 🔗 JavaScript Bridge

```javascript
window.webkit.messageHandlers.iOSBridge.postMessage({
  action: 'openExternal',
  url: 'https://example.com'
});

// Simplified API
window.PlantaLivreApp.openExternal('https://example.com');
window.PlantaLivreApp.share('Title', 'Text', 'URL');
window.PlantaLivreApp.toast('Message');
```

---

**Version**: 1.0.0  
**Bundle ID**: pt.plantalivre.app  
**Min iOS**: 15.0
