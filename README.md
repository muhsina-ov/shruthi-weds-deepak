# Shruthi & Deepak invitation

A mobile-first illustrated invitation for 26 February 2027. The live build includes the animated opening, Colorado story, Tamil copy, morning ceremony and editorial evening sections, maps, dress guidance, timeline and calendar files.

## Run locally

```sh
npm install
npm run dev
```

## Editing guide

- Main experience and event links: `app/page.tsx`
- Layered visual system: `app/globals.css`; GSAP scroll and pointer motion: `app/motion-director.tsx`
- Generated optimized site images: `public/art/*.webp`
- PNG masters: `../assets/concept/*.png`
- Calendar downloads: `public/muhurtham.ics`, `public/reception.ics`

The opening is a composited book spread: live typography over a paper page, with separate movable couple, temple, and Colorado keepsake layers. PNG masters 07–12 preserve the scrapbook studies and individual cultural elements. The morning temple photograph is framed by brass kuthuvilakku lamps; a rice-flour kolam carries into the section transition and ceremony stationery. The evening reception uses a tall burgundy arch and minimal black-tie typography instead of a hall photograph. GSAP directs the click-triggered wine-curtain transition, light bloom, scroll-linked parallax, and subtle pointer response. Reduced-motion visitors enter directly without the transition.

## RSVP engine integration

RSVP storage, notifications and counts are intentionally outside this project. Add your engine’s component or embed between the details and closing sections in `app/page.tsx`, with `id="rsvp"`. Then update the header link to point to `#rsvp`. No guest data is currently collected here.

## Soundtrack

Set `NEXT_PUBLIC_WEDDING_SONG_URL` to a permitted MP3 URL or place a licensed MP3 in `public/` and set it to a path such as `/wedding-song.mp3`. The opening then offers music and silent entry. Without a song URL, no music button or missing-media request appears.

## Final client checks

Confirm the precise booked room at The Meadow Wood, the two addresses, and that the illustrations are acceptable representations of the couple and venues. Have a fluent Tamil reviewer check the couplet. The invitation stays private until it is ready for guest sharing.
