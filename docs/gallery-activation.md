# Gallery page: how to activate it

The gallery page (`/gallery` in Marathi, `/en/gallery` in English) is hidden on purpose until real photos are ready. The code is intact; one flag controls it.

## What "hidden" means today

`SHOW_GALLERY = false` in `lib/flags.ts` does all of this:

| Place | Effect while hidden |
|-------|---------------------|
| `app/[lang]/gallery/page.tsx` | Page and its metadata return 404 (`notFound()`) |
| `app/components/Navbar.tsx` | "Gallery" is removed from the menu (desktop and mobile) |
| `app/components/Footer.tsx` | "Photo Gallery" link is removed |
| `app/sitemap.ts` | `/gallery` and `/en/gallery` are not listed |
| `next.config.ts` | Old `/menu` URL redirects to `/franchise` (not `/gallery`) |

## Steps to activate

1. **Replace the stock photos.** `app/[lang]/gallery/page.tsx` uses Unsplash images, not Pizza Mood photos. Swap them for real store, product and kitchen photos (put files in `public/` and reference them by path). Check the Marathi and English captions in `lib/i18n/dictionaries/{en,mr}/pages.ts` (`gallery` section) still match the new photos.
2. **Turn the flag on:** set `SHOW_GALLERY = true` in `lib/flags.ts`.
3. **Restore the old `/menu` redirect:** in `next.config.ts`, change `["/menu", "/franchise"]` back to `["/menu", "/gallery"]`.
4. **Check locally:** open `/gallery` and `/en/gallery`. Both should return 200, show in the menu and footer, and appear in `/sitemap.xml`.
5. **Deploy, then tell search engines:**
   - Re-submit `https://www.pizzamood.in/sitemap.xml` in Search Console and Bing Webmaster Tools.
   - Run `node scripts/indexnow.mjs` to ping Bing about the new URLs.

## Notes

- Do not delete the gallery page or its dictionary text; only the flag hides it.
- Any link added elsewhere to `/gallery` while hidden will 404, so wrap it in `SHOW_GALLERY` as the navbar and footer do.
