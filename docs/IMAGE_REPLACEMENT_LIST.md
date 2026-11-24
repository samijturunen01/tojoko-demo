# Image replacement list – Tojoko Oy

All photos in the demo are illustrative Pexels images (see ASSET_PROVENANCE.md). They may legally stay in
production because they are labelled "Kuvituskuva", but authentic photos would build far more trust. The list
is ordered by impact; **five authentic photos** would cover the whole site.

| # | Page / section | Current image | Recommended authentic replacement | Size / orientation | Required before production? |
|---|---|---|---|---|---|
| 1 | Korjaamo – hero; Home – photo break | `tyokaluseina` (Pexels 14637833) | The real workshop: hall interior or the owner's own tool wall | ≥ 2400 × 1600, landscape (hero crops to 4:5 portrait on desktop) | Recommended |
| 2 | Korjaamo – new "who you deal with" block | — (none) | Portrait of the owner/mechanic at work, friendly, natural light | ≥ 1600 × 2000, portrait | Recommended (strong trust signal) |
| 3 | Vianselvitys – hero | `diagnoosi` (Pexels 4116193) | Owner using the garage's own diagnostic tool on a customer car (plate hidden) | ≥ 1600 × 1067, landscape | Optional |
| 4 | Autohuolto – hero | `oljy` (Pexels 13065690) | A real service in progress at Tojoko | ≥ 1600 × 1067, landscape | Optional |
| 5 | Autokorjaukset – hero | `alusta` (Pexels 4116173) | Car on Tojoko's lift, repair in progress | ≥ 1600 × 1067, landscape | Optional |
| 6 | Contact – map side | drawn sketch | Exterior of Aspitie 16 with the entrance / sign, so first-time visitors recognise the door | ≥ 1600 × 1067, landscape | Recommended |
| 7 | Secondary photos (`mittatikku`, `akkutesti`, `moottoritila`) | Pexels | Any authentic detail shots | ≥ 1600 px wide | Optional |

Guidelines: no customer number plates or faces without consent; tidy background; daylight or even lighting.
To replace: put the originals in `source-assets/`, point the entry in `scripts/process-images.mjs` to the new
file, update alt text in `src/data/photos.ts` (and remove "Kuvituskuva" from authentic ones), run `npm run images`.
