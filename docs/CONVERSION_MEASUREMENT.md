# Conversion measurement plan – Tojoko Oy

**Demo status:** no analytics, no cookies, no third-party requests. `src/lib/analytics.ts` only logs events to
the console in development. Activate a consented analytics setup only after customer approval.

## Metrics

- **Primary:** qualified contacts = phone calls (measured as `phone_click` + call log from the owner) and
  successfully submitted time requests (`form_submit_success`) that lead to a booked job.
- **Secondary:** `symptom_select`, `service_interest`, `reviews_click`, `directions_click`, `map_load`, CTA clicks.
- **Business outcome (owner's records):** booked jobs and revenue from web-originated contacts. Clicks and form
  starts are micro-conversions, not sales.

## Events (implemented as no-ops)

| Event | Fired when | Params (no personal data) |
|---|---|---|
| `cta_click` | Any "Pyydä aikaa" CTA | `location`, optional `symptom` |
| `phone_click` | Any `tel:` link | `location` |
| `form_start` | First input in the time request | `form` |
| `form_validation_error` | Submit blocked | `field` (first invalid field name) |
| `form_submit_success` | Submission accepted | `topic`, `demo` |
| `service_interest` | Service link clicked | `service`, `location` |
| `symptom_select` | Symptom tag chosen | `symptom` |
| `reviews_click` | Google reviews link | `location` |
| `directions_click` | Directions / open in Maps | `location` |
| `map_load` | Map loaded on request | `location` |

Never send names, phone numbers, plates, emails or free text.

## Implementation requirements (production)

1. Choose GA4 + GTM or a privacy-friendly tool (e.g. Plausible / Matomo without cookies).
2. Consent banner if cookies or identifiers are used; load nothing before consent.
3. Replace the body of `track()` with `window.dataLayer.push(...)` (or the tool's API).
4. Privacy notice describing analytics and the contact form (Apps Script) processing.
5. Mark `phone_click` and `form_submit_success` as key events.

## Baselines

No website exists, so there is no web baseline. Ask the owner for: current calls per week, share of new
customers, and how they found Tojoko (Google Maps, word of mouth). Compare 3 months after launch.

## Optimisation ideas after launch

- Hero subline variants (hard faults vs. friendliness) → calls per visit
- CTA wording "Pyydä aikaa" vs. "Kysy aikaa"
- Symptom picker → form completion rate and description quality
- Mobile call bar → mobile phone clicks
- Publishing a basic price range (if the owner agrees) → contact rate on service pages
