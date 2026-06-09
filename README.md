# peptidim — פפטידים ישראל

A simple, **sales-first** single-page site for **פפטידים ישראל** (Peptides Israel).
Every product → one-tap **order via WhatsApp**. No catalog complexity, no checkout —
just names, sizes, and a WhatsApp button. Hebrew (RTL).

- **`index.html`** — the whole site (static, no build step). Product list + search +
  category filter + WhatsApp deep-links.
- **`img/brand.jpeg`** — brand/style source (navy + silver/blue, DNA-leaf logo,
  tagline *מחקר. איכות. אמינות.*). Used as hero, OG image, and favicon.
- **WhatsApp:** `972506787586` (050-678-7586). Each "הזמן בוואטסאפ" opens a chat
  pre-filled with the product name + size.
- 63 products carried over from the Isra.Peptides catalog. Prices/availability are
  given over WhatsApp. **Research use only (RUO)** disclaimer in footer.

## Deploy
Static — host anywhere. To put it on GitHub + Pages:
```
gh auth login
gh repo create peptidim --public --source=. --remote=origin --push
```
Then enable Pages (branch `main`, root) — or drop the folder on Netlify.

## Edit products
Open `index.html`, edit the `P=[...]` array (name `n`, size `mg`, category `c`).
WhatsApp number is the `WA` constant near the top of the script.
