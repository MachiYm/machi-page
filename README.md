# MachiYm osobná stránka

Moderná osobná webová stránka pre MachiYm postavená vo Vite a Reacte.

## Lokálne spustenie

```bash
npm install
npm run dev
```

## Produkčný build

```bash
npm run build
```

Výstup sa vytvorí v priečinku `dist`.

## Deploy na GitHub Pages

Repozitár je pripravený na automatický deploy cez GitHub Actions.

1. Nahraj projekt na GitHub.
2. V repozitári otvor `Settings` -> `Pages`.
3. Ako zdroj vyber `GitHub Actions`.
4. Pushni zmeny do vetvy `main`.

Workflow vytvorí produkčný build a nasadí priečinok `dist`.
