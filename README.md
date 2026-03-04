# ❤️ SolidaritéPC — Cagnotte pour Naomie

> Site de cagnotte solidaire pour aider Azareel Naomie MEBOUNOU à obtenir un ordinateur portable pour terminer sa Licence en Réseaux & Télécommunications à l'UCAO-UUC.

---

## 🚀 Installation & Lancement

### Prérequis
- **Node.js** version 18+ (recommandé : 20+)
- **npm** (inclus avec Node.js)

### Étapes

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Build de production

```bash
npm run build
npm run preview
```

---

## 📸 Ajouter les images

Placez vos images dans le dossier `public/images/` :

```
public/
  images/
    photo1.jpg    ← Photo principale de Naomie (affichée dans le hero)
    photo2.jpg    ← 2ème photo de Naomie (section histoire)
    photo3.jpg    ← 3ème photo de Naomie (section histoire)
    pc1.jpg       ← Photo du HP EliteBook 840 G5 (vue principale)
    pc2.jpg       ← 2ème photo du PC
    pc3.jpg       ← 3ème photo du PC
```

### Comment copier vos images depuis Windows :

```bash
# Depuis votre dossier Windows, copiez les fichiers :
# C:\Users\NOUKON Gilberto\Desktop\naomie\photo1.jpg  →  public/images/photo1.jpg
# C:\Users\NOUKON Gilberto\Desktop\naomie\photo2.jpg  →  public/images/photo2.jpg
# C:\Users\NOUKON Gilberto\Desktop\naomie\photo3.jpg  →  public/images/photo3.jpg
# C:\Users\NOUKON Gilberto\Desktop\naomie\pc1.jpg     →  public/images/pc1.jpg
# C:\Users\NOUKON Gilberto\Desktop\naomie\pc2.jpg     →  public/images/pc2.jpg
# C:\Users\NOUKON Gilberto\Desktop\naomie\pc3.jpg     →  public/images/pc3.jpg
```

---

## 🎨 Personnalisation

Toute la configuration (noms, numéro MTN, prix, etc.) se trouve en haut du fichier `src/App.jsx` dans l'objet `CONFIG` :

```javascript
const CONFIG = {
  name: "Azareel Naomie MEBOUNOU",
  shortName: "Naomie",
  goal: 200000,
  mtnNumber: "0161546128",
  mtnName: "Azareel MEBOUNOU",
  // ...
}
```

---

## 🛠 Stack technique

- **React 18** + **Vite 5**
- **Tailwind CSS 3.4**
- Fonts : Playfair Display + DM Sans (Google Fonts)
- Animations CSS + Intersection Observer
- Responsive (mobile-first)
- Zéro dépendance externe supplémentaire

---

## 📱 Déploiement gratuit

Pour héberger le site gratuitement :

1. **Vercel** : `npx vercel` (le plus simple)
2. **Netlify** : Glissez-déposez le dossier `dist/` après `npm run build`
3. **GitHub Pages** : Poussez sur GitHub et activez Pages

---

Fait avec ❤️ pour Naomie — Cotonou, Bénin 2025
