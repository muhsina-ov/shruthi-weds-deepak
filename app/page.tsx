"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const MotionDirector = dynamic(() => import("./motion-director"), { ssr: false });

const MAPS = {
  morning: "https://maps.app.goo.gl/2wmqyQn2TaDFKkFo6?g_st=ic",
  evening: "https://maps.app.goo.gl/EeiMpJn7pcFr11Z9A?g_st=ic",
};
const SOUNDTRACK_URL = process.env.NEXT_PUBLIC_WEDDING_SONG_URL || "/wedding-song.mp3";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [openingRequested, setOpeningRequested] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const openingFallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = "/art/01-opening-hero.webp";
    if (!SOUNDTRACK_URL) return;
    const audio = new Audio(SOUNDTRACK_URL);
    audio.preload = "auto";
    const markReady = () => setAudioReady(true);
    audio.addEventListener("canplaythrough", markReady, { once: true });
    audio.addEventListener("canplay", markReady, { once: true });
    audio.addEventListener("loadedmetadata", markReady, { once: true });
    audio.addEventListener("error", () => setAudioReady(false), { once: true });
    audio.load();
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [opened]);

  useEffect(() => () => {
    if (openingFallbackRef.current) clearTimeout(openingFallbackRef.current);
  }, []);

  const finishOpening = useCallback(() => {
    if (openingFallbackRef.current) clearTimeout(openingFallbackRef.current);
    openingFallbackRef.current = null;
    setOpened(true);
  }, []);

  function openInvitation(withMusic: boolean) {
    if (openingRequested || opened) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) finishOpening();
    else {
      setOpeningRequested(true);
      openingFallbackRef.current = setTimeout(finishOpening, 3600);
    }
    if (withMusic && audioRef.current) {
      const audio = audioRef.current;
      const playFromBeginning = () => {
        try {
          audio.currentTime = 0;
        } catch (_) {}
        audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      };

      if (audio.readyState >= 1) {
        playFromBeginning();
      } else {
        audio.addEventListener(
          "loadedmetadata",
          () => {
            try {
              audio.currentTime = 0;
            } catch (_) {}
          },
          { once: true }
        );
        audio.play().then(() => {
          try {
            audio.currentTime = 0;
          } catch (_) {}
          setPlaying(true);
        }).catch(() => setPlaying(false));
      }
    }
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  return (
    <main id="main" className={`site-shell ${openingRequested && !opened ? "opening-turning" : ""} ${opened ? "invitation-open" : ""}`}>
      <a className="skip-link" href="#story" onClick={finishOpening}>Skip opening</a>
      <MotionDirector opened={opened} openingRequested={openingRequested} onOpenComplete={finishOpening} />
      {SOUNDTRACK_URL && (
        <audio
          ref={audioRef}
          src={SOUNDTRACK_URL}
          loop
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setAudioReady(true)}
          onLoadedMetadata={() => setAudioReady(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}

      <div className="opening" aria-hidden={opened}>
        <div className="opening-backdrop" aria-hidden="true" />
        <div className="opening-light" aria-hidden="true" />
        <div className="opening-book opening-arch-card" role="group" aria-label="Shruthi and Deepak's wedding invitation cover">
          <div className="opening-book-right">
            <img className="opening-cover-paper" src="/art/arch-backdrop.webp" alt="Wedding invitation arched burgundy backdrop" fetchPriority="high" />
            <div className="card-curl-shadow" aria-hidden="true" />
            <img className="cover-garland" src="/art/10-jasmine-rose-garland.webp" alt="Traditional jasmine and rose garland" aria-hidden="true" />
            <img className="cover-kolam" src="/art/12-rice-flour-kolam.webp" alt="" aria-hidden="true" />
            <img className="cover-lamp cover-lamp-left" src="/art/11-brass-kuthuvilakku.webp" alt="" aria-hidden="true" />
            <img className="cover-lamp cover-lamp-right" src="/art/11-brass-kuthuvilakku.webp" alt="" aria-hidden="true" />
            <figure className="cover-temple-card">
              <img src="/art/03-muhurtham-temple.webp" alt="Illustration of the wedding temple in Bridgewater" />
              <figcaption>Bridgewater, NJ</figcaption>
            </figure>
            <figure className="cover-colorado-card">
              <img src="/art/05-colorado-story.webp" alt="Their first spark in Colorado" />
              <figcaption>where it began</figcaption>
            </figure>
            <img className="cover-couple-cutout" src="/art/02-couple-cutout.webp" alt="Illustrated portrait of Shruthi and Deepak" />
            <div className="opening-mobile-copy cover-copy">
              <span className="opening-mobile-overline cover-overline">A wedding invitation</span>
              <p className="opening-mobile-title cover-title">Shruthi <i>&amp;</i><br />Deepak</p>
              <p className="opening-mobile-date cover-date">Saturday · 27 February 2027 · New Jersey</p>
              <p className="cover-tamil" lang="ta">ஒளியும் ஒலியும் சேரும் தருணம்,<br />உங்கள் வருகையால் சிறக்கும் இன்பத் தருணம்.</p>
              <button type="button" className="opening-button" onClick={() => openInvitation(true)} disabled={openingRequested} tabIndex={opened ? -1 : 0}>Turn the page <span aria-hidden="true">→</span></button>
              {SOUNDTRACK_URL && <button type="button" className="silent-button" onClick={() => openInvitation(false)} disabled={openingRequested} tabIndex={opened ? -1 : 0}>Enter without music</button>}
            </div>
            <span className="opening-art-note">Colorado → Bridgewater → forever</span>
          </div>
        </div>
        <div className="opening-flash" aria-hidden="true" />
      </div>

      <div inert={!opened}>
      <header className="site-header">
        <a className="wordmark" href="#main" aria-label="Shruthi and Deepak, back to top">ஒலி <span>×</span> ஒளி</a>
        <nav aria-label="Invitation sections">
          <a href="#story">Our story</a>
          <a href="#events">The day</a>
          <a href="#details">Details</a>
          <a className="header-rsvp" href="#muhurtham">Muhurtham <span aria-hidden="true">↓</span></a>
        </nav>
      </header>
      {SOUNDTRACK_URL && opened && <button className="music-toggle" type="button" onClick={toggleMusic} aria-label={playing ? "Pause music" : "Play music"}>{playing ? "♪ Sound on" : "♪ Sound off"}</button>}

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">A celebration of sound &amp; light</p>
          <h1 id="hero-title">Shruthi <em>&amp;</em><br />Deepak</h1>
          <p className="hero-date">Saturday, the twenty-seventh of February <span>2027</span></p>
          <p className="hero-invitation">With full hearts, we invite you to celebrate with us.</p>
          <a className="primary-link" href="#story">Discover our story <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art-wrap">
          <img className="hero-art" src="/art/01-opening-hero.webp" alt="Illustration of Shruthi and Deepak before a white South Indian temple" fetchPriority="high" />
          <div className="hero-art-caption">Bridgewater · New Jersey</div>
        </div>
        <div className="hero-side-note">A story in two celebrations</div>
      </section>

      <section id="story" className="story-section" aria-labelledby="story-heading">
        <div className="story-image"><img src="/art/05-colorado-story.webp" alt="Illustration of Shruthi and Deepak sharing a card trick in the Colorado mountains" loading="lazy" /><span>01 / Where it began</span></div>
        <div className="story-copy">
          <p className="section-kicker">Our story</p>
          <h2 id="story-heading">A little spark<br /><em>in the mountains.</em></h2>
          <p>Sometimes, all it takes is a little spark to begin a story. Ours happened with a magic trick in the mountains of Colorado.</p>
          <p>It was a trip where we barely spoke, but somehow noticed something in each other. Neither of us expected it, but that one unplanned moment stayed with us long after the trip ended. Somehow, everything that followed started making a strange kind of sense.</p>
          <span className="story-flourish" aria-hidden="true">✦</span>
        </div>
      </section>

      <section className="poem-section" aria-label="Our invitation words">
        <div className="poem-arc" aria-hidden="true" />
        <p className="poem-tamil" lang="ta">ஒளியும் ஒலியும் சேரும் தருணம்,<br />உங்கள் வருகையால் சிறக்கும் இன்பத் தருணம்.</p>
        <div className="poem-rule" />
        <p>Through every chapter, so many of you have been a part of our journey. You’ve seen us grow closer, stood by us, celebrated our happiness, and helped make our story what it is today.</p>
        <p>Now, as we take the step from you and me to us, forever, there is one thing we wish for most. Some moments are meant to be celebrated together. This is one of them.</p>
        <p className="poem-emphasis">So be there for the smiles, the happy tears, and the memories we’ll be retelling for years to come.</p>
      </section>

      <section id="events" className="events-intro" aria-labelledby="events-title"><span className="section-kicker">Saturday · 27 February 2027</span><h2 id="events-title">One day.<br /><em>Two celebrations.</em></h2><p>From a sacred morning to an unforgettable night.</p><img className="events-kolam" src="/art/12-rice-flour-kolam.webp" alt="" aria-hidden="true" loading="lazy" /></section>

      <section id="muhurtham" className="event-section morning-event" aria-labelledby="morning-heading">
        <div className="event-visual"><img src="/art/03-muhurtham-temple.webp" alt="Illustrated exterior of Sri Venkateswara Temple in Bridgewater at sunrise" loading="lazy" /><img className="ceremony-lamp ceremony-lamp-left" src="/art/11-brass-kuthuvilakku.webp" alt="" aria-hidden="true" loading="lazy" /><img className="ceremony-lamp ceremony-lamp-right" src="/art/11-brass-kuthuvilakku.webp" alt="" aria-hidden="true" loading="lazy" /><span className="visual-index">01 / Morning</span></div>
        <div className="event-content">
          <img className="ceremony-kolam" src="/art/12-rice-flour-kolam.webp" alt="" aria-hidden="true" loading="lazy" />
          <p className="section-kicker">The ceremony · 8:30 AM–1:00 PM</p>
          <h2 id="morning-heading">Muhurtham</h2>
          <p className="event-lede">Muhurtham from 9:00–10:30 AM · A Tamil Hindu wedding at the heart of our day.</p>
          <div className="event-facts"><div><span>Where</span><strong>Sri Venkateswara Temple</strong><small>1 Balaji Temple Drive<br />Bridgewater, NJ 08807</small></div><div><span>Dress</span><strong>South Indian traditional</strong><small>Veshti for men · Pattu Saree for women</small></div></div>
          <div className="event-actions"><a href={MAPS.morning} target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a><a href="/muhurtham.ics" download>Add to calendar <span aria-hidden="true">↓</span></a></div>
        </div>
      </section>

      <section id="evening" className="evening-event" aria-labelledby="evening-heading">
        <div className="evening-arch" aria-hidden="true" />
        <div className="evening-content">
          <p className="section-kicker">The evening celebration</p>
          <h2 id="evening-heading">We tied the knot earlier—<br /><em>now it’s time to loosen the bow ties.</em></h2>
          <div className="evening-time">7:00 PM – 12:00 AM</div>
          <div className="evening-minimal-details">
            <div><span>Place</span><strong>The Meadow Wood</strong><small>461 NJ-10 · Randolph, NJ 07869</small></div>
            <div><span>Attire</span><strong>Black Tie</strong></div>
          </div>
          <div className="event-actions"><a href={MAPS.evening} target="_blank" rel="noopener noreferrer">Place directions <span aria-hidden="true">↗</span></a><a href="/reception.ics" download>Add to calendar <span aria-hidden="true">↓</span></a></div>
        </div>
      </section>

      <section id="details" className="details-section" aria-labelledby="details-heading">
        <div className="details-heading"><p className="section-kicker">At a glance</p><h2 id="details-heading">The day,<br /><em>beautifully simple.</em></h2></div>
        <div className="timeline"><div className="timeline-line" /><article><span className="timeline-time">08:30 AM</span><div><h3>Ceremony begins</h3><p>Sri Venkateswara Temple · Bridgewater</p><small>Veshti / Pattu Saree</small></div></article><article><span className="timeline-time">09:00 AM</span><div><h3>Muhurtham</h3><p>9:00–10:30 AM</p></div></article><article><span className="timeline-time">07:00 PM</span><div><h3>Evening celebration</h3><p>The Meadow Wood · Randolph</p><small>Black Tie</small></div></article><article><span className="timeline-time">12:00 AM</span><div><h3>Until midnight</h3><p>One more song before we call it a night.</p></div></article></div>
      </section>

      {/* Mount the user's RSVP engine here and add a #rsvp navigation link when ready. */}

      <section id="closing" className="closing-section" aria-labelledby="closing-heading"><img className="closing-ornament" src="/art/06-ornamental-overlay.webp" alt="" loading="lazy" /><div className="closing-copy"><p className="section-kicker">A note from us</p><h2 id="closing-heading">All that’s<br /><em>missing is you.</em></h2><p>Because when we look back on this day years from now, we won’t just remember the ceremony or the celebration. We’ll remember the people who were there.</p><p>We’ve got the venue, the outfits, and each other. All that’s missing is you.</p><div className="closing-signature">Shruthi &amp; Deepak <span lang="ta">ஒலி &amp; ஒளி</span></div></div><img className="closing-couple" src="/art/02-couple-cutout.webp" alt="Illustration of Shruthi and Deepak in traditional wedding attire" loading="lazy" /></section>

      <footer className="footer"><div className="footer-monogram" lang="ta">ஒலி × ஒளி</div><p>27 February 2027 · New Jersey</p><a href="#main">Back to top ↑</a></footer>
      </div>
    </main>
  );
}
