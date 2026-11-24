# Backend integration (production only) – time request form

The demo never sends or stores anything: `getFormAdapter()` in `src/lib/forms/submit.ts` returns a demo adapter
that resolves with "Demoversio – viestiä ei lähetetty." **Do not activate anything below without customer approval.**

## Google Apps Script

1. Create an Apps Script web app (Execute as: me, Access: anyone) with `doPost(e)`:
   - parse `JSON.parse(e.postData.contents)`
   - reject if the honeypot `website` is non-empty
   - validate server-side (topic, name, phone; lengths) – never trust the client
   - verify reCAPTCHA (below), then e-mail the request to the garage and/or append a row to a private Sheet
   - return `ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON)`
2. Build with:
   ```
   VITE_FORM_MODE=apps-script
   VITE_FORM_ENDPOINT=https://script.google.com/macros/s/<deployment-id>/exec
   ```
   The client posts `text/plain` JSON (avoids a CORS preflight).

Payload: `{ topic, plate, vehicle, description, timing, name, phone, email, website, recaptchaToken }`.

## reCAPTCHA v3

- Public site key only in the frontend: `VITE_RECAPTCHA_SITE_KEY` (load the reCAPTCHA script only on the contact page, after consent if required).
- The **secret key stays in Apps Script** (Script Properties). Verify with
  `UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'post', payload: { secret, response: token } })`
  and require `success && score >= 0.5 && action === 'time_request'`.

## Privacy (to prepare with the customer)

- Privacy notice: controller (Tojoko Oy), purpose (agreeing a time), data, retention, recipients (Google), rights.
- Keep requests only as long as needed; restrict Sheet access.
- Update the form's demo note and success message (`submit.ts`) to describe the real process once confirmed.
