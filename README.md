# TP2-CI-CD – Moteur de tarification + API Express

Projet de CI/CD pour un moteur de tarification avec API Express, tests unitaires, tests d’intégration (HTTP avec Supertest), linter ESLint et couverture de code (≥ 80 %) via GitHub Actions.

## 📦 Installation

```bash
git clone https://github.com/ZineeEddine/TP2-CI-CD.git
cd TP2-CI-CD
npm install
```

> Nécessite Node.js 18.x.

---

## 🧪 Tests unitaires et d’intégration

Lancer les tests (unitaires + HTTP avec Supertest) :

```bash
npm test
```

Lancer les tests en mode continu (watch) :

```bash
npm run test:watch
```

---

## 📊 Couverture de code (≥ 80 %)

Lancer les tests avec couverture :

```bash
npm run test:coverage
```

Le pipeline échoue si la couverture est inférieure à 80 % sur l’un des critères :
- branches  
- fonctions  
- lignes  
- instructions  

---

## ✨ Lint (ESLint)

Vérifier le code :

```bash
npm run lint
```

Corriger automatiquement certains problèmes :

```bash
npm run lint:fix
```

---

## 🚀 Lancer l’API Express (manuel)

Pour lancer l’API, exécute directement le fichier principal :

```bash
node index.js
```

Par défaut, l’API est disponible sur `http://localhost:3000` (ou le port que tu as configuré dans `index.js`).

---

## 🔄 CI/CD – GitHub Actions

Un pipeline automatique est configuré dans `.github/workflows/ci.yml` :  
1. Installation des dépendances (`npm ci`)  
2. Lint (`npm run lint`)  
3. Tests + couverture (`npm run test:coverage`) avec seuil à 80 %

Vérifie l’état du pipeline ici :  
👉 https://github.com/ZineeEddine/TP2-CI-CD/actions

---

## 🧩 Structure des dossiers

- `src/`      : code métier, promotions, API Express  
- `tests/` ou sous‑dossiers dans `src/.../test` : tests unitaires et tests HTTP avec Supertest  
- `.github/workflows/` : pipeline CI GitHub Actions  
- `coverage/` : rapports de couverture générés par Jest
