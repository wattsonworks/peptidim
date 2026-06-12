/**
 * פפטידים ישראל — Lead / Order capture endpoint (Google Sheets)
 * ------------------------------------------------------------------
 * Deploy this as a Web App and paste the resulting /exec URL into
 * index.html → CONFIG.SHEET_ENDPOINT.
 *
 * HOW TO DEPLOY (one time, ~3 minutes):
 *  1. Create a Google Sheet. Note its tab name (default "Leads").
 *  2. Extensions → Apps Script. Delete the sample, paste THIS file.
 *  3. Set SHEET_ID below to the id in your sheet URL
 *     (https://docs.google.com/spreadsheets/d/<THIS_PART>/edit).
 *  4. Deploy → New deployment → type "Web app".
 *       Execute as: Me   |   Who has access: Anyone
 *  5. Copy the Web app URL (ends with /exec) → put it in index.html.
 *  6. Re-deploy after any edit (Deploy → Manage deployments → edit → new version).
 *
 * The site POSTs form-encoded data (no-cors), so it never blocks the
 * customer even if the sheet is slow or offline. WhatsApp always opens.
 */

var SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
var SHEET_TAB = 'Leads';

var HEADERS = [
  'תאריך', 'סוג פנייה', 'שם', 'טלפון', 'אימייל', 'כתובת מגורים',
  'קוד קופון', 'שם סוכן', 'אופן קבלה', 'הנחה %', 'סכום לפני', 'סכום אחרי',
  'מוצרים', 'מקור'
];

function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sh = ss.getSheetByName(SHEET_TAB) || ss.insertSheet(SHEET_TAB);
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sh.setFrozenRows(1);
    }
    sh.appendRow([
      new Date(),
      p.type || '',          // "buy" | "ask"
      p.name || '',
      p.phone || '',
      p.email || '',
      p.address || '',
      p.coupon || '',
      p.agent || '',
      p.fulfillment || '',   // pickup | crypto | delivery
      p.discountPct || '',
      p.subtotal || '',
      p.total || '',
      p.items || '',         // multiline product list w/ descriptions
      p.source || 'peptidim'
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('peptidim lead endpoint is live');
}
