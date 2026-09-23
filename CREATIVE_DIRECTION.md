# Shruthi & Deepak — creative direction

## North star

This should feel like a short illustrated film that happens to be an invitation—not a decorated RSVP page.

The central idea is **ஒலி × ஒளி — sound meets light**. It is personal to their names and already lives in their chosen Tamil line. Sound becomes the motion language: fine concentric lines, music, rhythm, and the card trick that began their story. Light becomes the visual language: a lamp flame at dawn, gold catching on temple stone, candlelight, and the evening ballroom.

Working title: **When sound found light**  
Tamil signature: **ஒலி & ஒளி**  
Names: **Shruthi & Deepak**  
Date: **26 February 2027**

## Art direction

- Style: editorial gouache and watercolor on warm cotton paper; recognizable portraits, never caricatures.
- Morning palette: warm ivory `#F4EDDF`, oxblood `#6E1824`, antique gold `#AE8448`, leaf `#65705B`.
- Evening palette: ink burgundy `#260B10`, wine `#661927`, candle `#D4AF72`, soft ivory `#EFE5D4`.
- Typography: expressive high-contrast serif for display, restrained humanist sans for details, a Tamil typeface tested at real mobile sizes. Avoid scripts for body copy.
- Texture: paper grain, faint kolam geometry, jasmine, brass, and controlled glints. No generic paisley wallpaper or synthetic gold gradients.
- Motion: slow, tactile, and purposeful. Paper folds, lamp ignition, line drawing, parallax, mask reveals, and gentle scene transitions. No bouncing UI or confetti.

## Guest journey

1. **Arrival / sound consent**  
   A quiet cream screen shows one line: “Some stories begin with a little spark.” A deliberate “Enter with music” control satisfies browser audio rules. A silent-entry option remains visible.

2. **Opening ritual**  
   Two illustrated temple doors part. A lamp ignites, its glow becomes a sound ring, and the couple appears before the temple. Names, date, and a compact save-the-date action resolve into view.

3. **The first spark — Colorado**  
   The mountain scene enters with subtle depth. A single playing card turns; its heart becomes a warm point of light. Copy is edited into short, paced passages so the mobile screen never becomes a wall of text.

4. **Invitation poem**  
   The Tamil couplet appears first, with English support below. Sound-wave lines and lamplight meet to form the **ஒலி & ஒளி** signature.

5. **Morning / Muhurtham**  
   The palette opens into sunrise ivory. The Bridgewater temple is the anchor. Details: 9:00–10:30 AM, Tamil Hindu wedding, Veshti / Pattu Saree, address, map, and an “Add morning ceremony” calendar action.

6. **Scratch transition**  
   A small foil-look panel invites the guest to “Reveal the evening.” Scratching uncovers burgundy and candlelight underneath. The interaction is optional; a visible reveal button protects accessibility and impatient guests.

7. **Evening / celebration**  
   The scene shifts to The Meadow Wood at 7:00 PM–12:00 AM. The ballroom is sophisticated, not nightclub-like: chandeliers, champagne coupe tower, sculptural cake, black-tie copy, map, and calendar action.

8. **Timeline**  
   A single flowing line moves from sunrise to midnight. Only confirmed timings appear. Any missing milestones remain hidden rather than invented.

9. **Dress codes**  
   Two editorial panels: “Veshti / Pattu Saree” and “Black Tie / Formal.” Use tasteful illustrated fabric swatches rather than literal costume icons.

10. **RSVP**  
    One form captures guest name, mobile number, attendance choice (morning / evening / both / cannot attend), party size per event, and an optional note. Confirmation repeats the selected events and offers calendar links.

11. **Closing**  
    The couple cutout returns over quiet paper. Final line: “We’ve got the venues, the outfits, and each other. All that’s missing is you.” The lamp dims to the **ஒலி & ஒளி** monogram.

## RSVP architecture

A WhatsApp link alone cannot reliably create attendance counts. The robust version is:

1. Submit the form to a small serverless endpoint.
2. Validate and store the response in a private database or Google Sheet.
3. Send the couple a WhatsApp notification through the official WhatsApp Business API (or an approved provider).
4. Show a private live total by morning, evening, both, and total seats.
5. Add rate limiting, bot protection, consent copy, and a simple export to CSV.

The fallback version stores the response first, then opens a pre-filled WhatsApp message for the guest to send manually. Counts still come from stored form data, not from parsing WhatsApp.

## Asset manifest — concept pass

All generated art is production PNG, composed for vertical mobile screens.

- `assets/concept/01-opening-hero.png` — identity-preserving couple and temple hero.
- `assets/concept/02-couple-cutout.png` — transparent character layer for parallax and closing scene.
- `assets/concept/03-muhurtham-temple.png` — sunrise temple scene with clear copy space.
- `assets/concept/04-evening-reception.png` — candlelit black-tie ballroom scene.
- `assets/concept/05-colorado-story.png` — the real “magic trick in the mountains” origin scene.
- `assets/concept/06-ornamental-overlay.png` — transparent jasmine, lamp, and kolam corner overlay.

Before final production, the temple and ballroom artwork should be regenerated against client-approved reference photographs of the exact exterior and booked room. That is the only safe way to promise true location fidelity.

## Production plan

### Phase 1 — approval frame

- Approve the art direction, portrait likeness, palette, and scene order.
- Confirm exact architecture references and the booked Meadow Wood room.
- Lock the Tamil and English copy before animation.

### Phase 2 — build

- Build mobile-first with responsive tablet/desktop framing.
- Layer scenes as WebP/AVIF for delivery while retaining PNG masters.
- Animate with transforms, opacity, and masks; honor reduced-motion settings.
- Preload only the opening scene, then lazy-load later chapters.
- Target a fast first view on ordinary mobile data, not only Wi-Fi.

### Phase 3 — functional systems

- Maps, calendar files, music control, scratch reveal, RSVP storage, WhatsApp notifications, and private counts dashboard.
- Inline validation, retry states, duplicate-response handling, and a clear confirmation receipt.

### Phase 4 — quality gate

- Test current iPhone Safari, Android Chrome, desktop Safari/Chrome, and WhatsApp in-app browsers.
- Verify Tamil shaping, contrast, keyboard navigation, focus states, silent mode, reduced motion, and slow-network behavior.
- Compress media and test every map, calendar, RSVP, and contact action.
- Share a private preview before making any public/influencer-facing link available.

## Required client confirmations

- Exact Tamil song and permission/usage plan.
- Client-approved exterior image of Bridgewater Temple and confirmation that exterior imagery may be used. The temple states that photography/video is not permitted inside, so no interior scene should be implied.
- The specific Meadow Wood room booked, plus approved reference photos.
- RSVP WhatsApp number, RSVP deadline, maximum party size, and whether children are counted.
- Full event addresses as they should appear, contact names/numbers, parents' names if desired, and any dietary/accommodation question.
- Final wording and Tamil proofread by a fluent human reviewer.
- Date/time zone for calendar files: Eastern Time, including confirmation of daylight-saving handling.

## Privacy and launch safeguards

- Never publish the payment screenshots, UPI ID, transaction ID, or raw WhatsApp export.
- Strip metadata from public images and avoid exposing guest responses client-side.
- Put the preview behind an unguessable private link until the couple approves it.
- Obtain explicit permission for promotional reuse and agree on the exact posting window in writing.

## Success standard

The finished invitation should be memorable with the sound off, emotionally specific without being sentimental, faithful to the actual venues, and effortless for a guest to act on in under a minute. The influencer audience should encounter a polished story, not a demonstration of effects.
