# peptidim — פפטידים ישראל

A **sales-first**, single-page (no build step) site for **פפטידים ישראל** (Peptides
Israel). Customers browse the catalog, read a one-line plain-Hebrew description of
each peptide, build a basket, apply a coupon, choose a fulfillment method, and send
the whole order — with prices and totals — straight to **WhatsApp**. Hebrew, RTL.

Everything lives in **`index.html`** (HTML + CSS + JS, static). Open it, edit the
data arrays, done.

---

## What it does (feature map)

| Feature | Where in `index.html` |
|---|---|
| **Two WhatsApp actions** — "שליחת הזמנה" (buy) + "שאלה / ייעוץ" (ask) | basket footer, buttons `#cartBuy` / `#cartAsk` |
| **Plain-Hebrew effect description** per peptide (RUO-safe phrasing) | `DESC = {…}` object |
| Descriptions shown **on the card, in the basket, and inside both WhatsApp messages** | `render()`, `renderCart()`, `cartLinesText()` |
| **Prices** (₪ ILS) with per-size variants, live subtotal/discount/total | `P = [{… v:[{s,p}] }]` + `discountInfo()` |
| **Coupon codes** (percentage discounts) entered on-site | `CONFIG.COUPONS` |
| **Referral / agent tracking** — code auto-fills agent + free "agent name" field | `CONFIG.COUPONS[x].agent` + `#agentIn` |
| **Mandatory customer capture** (name, phone, email, address) on every order | checkout modal `#checkout` |
| **Fulfillment**: משלוח / איסוף עצמי / קריפטו + "תוך 24 שעות" promise | `#ful` radios |
| **Order logging to Google Sheets** (which agent, which products, totals) | `CONFIG.SHEET_ENDPOINT` + `postLead()` |
| Saved cart + saved details in the browser | `localStorage` `pep_cart2` / `pep_order` |

---

## Edit prices

In `index.html`, each product in the `P=[…]` array has a `v` (variants) field:

```js
{"id":"bpc157","n":"BPC-157","c":"recovery", …, "v":[{"s":"10mg","p":350}]}
{"id":"retatrutide", … "v":[{"s":"5mg","p":250},{"s":"10mg","p":450},{"s":"20mg","p":600}]}
```

- `s` = size label, `p` = price in ₪ (ILS).
- **Omit `p`** (e.g. `{"s":"5mg"}`) → shows **"בהצעת מחיר"** (quote on WhatsApp); the
  item is still orderable but excluded from the numeric total.
- Multiple variants → a size dropdown appears in the basket and the price updates live.

> Prices were taken from `PRICELIST.png`. **GHRP-2 / GHRP-6 acetate** were left as
> "quote" because their price was hidden behind artwork in the image — add `p` when known.

## Edit descriptions

Edit the `DESC = {…}` object (keyed by product `id`). Keep them research-framed
("נחקר בהקשר של…") and RUO-safe — no medical/treatment claims, no dosing.

## Edit coupons & agent codes

```js
CONFIG.COUPONS = {
  "WELCOME10":   { pct:10, label:"לקוח חדש" },
  "VIP15":       { pct:15, label:"VIP" },
  "AGENT-DAVID": { pct:10, label:"הפניית סוכן", agent:"דוד" } // referral: discounts + tags the agent
};
```

Codes are case-insensitive. When a coupon has an `agent`, it both discounts and
records who referred the customer (also surfaced in the WhatsApp message + Sheet).

## Contact details

Near the top of the script: `CONFIG.WA`, `CONFIG.TEL`, `CONFIG.DISP`, `CONFIG.IG`.

---

## Connect Google Sheets (optional, ~3 min)

Logs every **order** (and its agent/coupon/products/totals) into a spreadsheet.

1. Open `google-apps-script.gs` — follow the deploy steps at the top of the file.
2. Copy the Web-App URL (ends with `/exec`).
3. Paste it into `index.html` → `CONFIG.SHEET_ENDPOINT`.

If left empty, WhatsApp still works — only the Sheet logging is skipped. The POST is
fire-and-forget (`no-cors`), so a slow/offline sheet never blocks the customer.

---

## Deploy

Static — host anywhere. GitHub Pages (branch `main`, root) is already wired:

```
git add -A && git commit -m "…"
git push
```

**RUO:** all products are *Research Use Only* — not for human/veterinary/medical use.
Descriptions describe research context only and are not medical advice.
