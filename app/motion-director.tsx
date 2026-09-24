"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function MotionDirector({
  opened,
  openingRequested,
  onOpenComplete,
}: {
  opened: boolean;
  openingRequested: boolean;
  onOpenComplete: () => void;
}) {
  // 1. Initial Landing Page Loading Sequence: Staggered Keepsake Arrival
  useGSAP(() => {
    if (opened || openingRequested) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Set initial off-stage states
    gsap.set(".opening-book", {
      transformOrigin: "left center",
      y: 42,
      scale: 0.94,
      autoAlpha: 0,
    });
    gsap.set(".cover-kolam", { scale: 0.65, autoAlpha: 0, rotate: -8 });
    gsap.set([".cover-lamp-left", ".cover-lamp-right"], { y: 28, autoAlpha: 0, scale: 0.9 });
    gsap.set(".cover-couple-cutout", { y: 35, autoAlpha: 0, scale: 0.95 });
    gsap.set(".cover-temple-card", { x: 35, y: 25, rotate: 12, autoAlpha: 0 });
    gsap.set(".cover-colorado-card", { x: 28, y: 30, rotate: 16, autoAlpha: 0 });
    gsap.set(".opening-art-note", { y: 18, autoAlpha: 0, rotate: -7 });
    gsap.set([".cover-overline", ".cover-title", ".cover-date"], { y: 16, autoAlpha: 0 });
    gsap.set([".cover-copy .opening-button", ".cover-copy .silent-button"], { y: 18, autoAlpha: 0 });

    const intro = gsap.timeline({ delay: 0.1 });

    intro
      // 1. The burgundy arch card gracefully rises with rich depth
      .to(".opening-book", {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 1.05,
        ease: "power3.out",
      })
      // 2. Rice-flour kolam blooms at the floor of the arch
      .to(
        ".cover-kolam",
        {
          scale: 1,
          autoAlpha: 0.25,
          rotate: 0,
          duration: 0.85,
          ease: "power2.out",
        },
        "-=0.75"
      )
      // 3. Brass kuthuvilakku lamps ignite with warm light
      .to(
        [".cover-lamp-left", ".cover-lamp-right"],
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: "power2.out",
        },
        "-=0.6"
      )
      // 4. Illustrated couple cutout settles into the center foreground
      .to(
        ".cover-couple-cutout",
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.95,
          ease: "power3.out",
        },
        "-=0.55"
      )
      // 5. Temple & Colorado keepsake cards slide into position
      .to(
        ".cover-temple-card",
        {
          x: 0,
          y: 0,
          rotate: 5,
          autoAlpha: 1,
          duration: 0.85,
          ease: "back.out(1.2)",
        },
        "-=0.65"
      )
      .to(
        ".cover-colorado-card",
        {
          x: 0,
          y: 0,
          rotate: 8,
          autoAlpha: 1,
          duration: 0.85,
          ease: "back.out(1.2)",
        },
        "-=0.7"
      )
      .to(
        ".opening-art-note",
        {
          y: 0,
          rotate: -2.5,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      // 6. Gold & ivory typography cascades in
      .to(
        [".cover-overline", ".cover-title", ".cover-date"],
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.08,
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.5"
      )
      // 8. Interactive call-to-action buttons reveal
      .to(
        [".cover-copy .opening-button", ".cover-copy .silent-button"],
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.35"
      );
  }, []);

  // 2. Interactive Parallax Depth for Cursor on Desktop
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const book = document.querySelector<HTMLElement>(".opening-book-right");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let onMove: ((event: PointerEvent) => void) | undefined;
    let onLeave: (() => void) | undefined;

    if (book && finePointer) {
      const coupleX = gsap.quickTo(".cover-couple-cutout", "x", { duration: 0.65, ease: "power2.out" });
      const coupleY = gsap.quickTo(".cover-couple-cutout", "y", { duration: 0.65, ease: "power2.out" });
      const templeX = gsap.quickTo(".cover-temple-card", "x", { duration: 0.8, ease: "power2.out" });
      const templeY = gsap.quickTo(".cover-temple-card", "y", { duration: 0.8, ease: "power2.out" });
      const coloradoX = gsap.quickTo(".cover-colorado-card", "x", { duration: 0.7, ease: "power2.out" });
      const coloradoY = gsap.quickTo(".cover-colorado-card", "y", { duration: 0.7, ease: "power2.out" });
      const lampLeftX = gsap.quickTo(".cover-lamp-left", "x", { duration: 0.75, ease: "power2.out" });
      const lampLeftY = gsap.quickTo(".cover-lamp-left", "y", { duration: 0.75, ease: "power2.out" });

      onMove = (event: PointerEvent) => {
        const bounds = book.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        coupleX(x * 22);
        coupleY(y * 15);
        templeX(x * -12);
        templeY(y * -10);
        coloradoX(x * 26);
        coloradoY(y * 18);
        lampLeftX(x * -8);
        lampLeftY(y * -6);
      };

      onLeave = () => {
        coupleX(0);
        coupleY(0);
        templeX(0);
        templeY(0);
        coloradoX(0);
        coloradoY(0);
        lampLeftX(0);
        lampLeftY(0);
      };

      book.addEventListener("pointermove", onMove);
      book.addEventListener("pointerleave", onLeave);
    }

    return () => {
      if (book && onMove && onLeave) {
        book.removeEventListener("pointermove", onMove);
        book.removeEventListener("pointerleave", onLeave);
      }
    };
  }, []);

  // 3. ScrollTrigger animations for inner pages
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.to(".hero-art", {
      yPercent: 7,
      scale: 1.12,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 },
    });
    gsap.to(".story-image img", {
      yPercent: 9,
      scale: 1.14,
      ease: "none",
      scrollTrigger: { trigger: ".story-section", start: "top bottom", end: "bottom top", scrub: 1.3 },
    });
    gsap.fromTo(
      ".story-copy > *",
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.75, ease: "power2.out", scrollTrigger: { trigger: ".story-copy", start: "top 77%", toggleActions: "play none none reverse" } },
    );
    gsap.fromTo(
      ".poem-tamil",
      { opacity: 0.22, y: 35 },
      { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: ".poem-section", start: "top 82%", end: "center 45%", scrub: 1 } },
    );
    gsap.fromTo(
      ".events-intro h2",
      { opacity: 0.3, y: 40 },
      { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: ".events-intro", start: "top 85%", end: "center 50%", scrub: 1 } },
    );
    gsap.fromTo(
      ".events-kolam",
      { opacity: 0, scale: 0.82, rotate: -8 },
      { opacity: 0.15, scale: 1, rotate: 0, duration: 1.1, ease: "power2.out", scrollTrigger: { trigger: ".events-intro", start: "top 68%", toggleActions: "play none none reverse" } },
    );
    gsap.fromTo(
      ".ceremony-lamp",
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 1.15, stagger: 0.16, ease: "power2.out", scrollTrigger: { trigger: ".morning-event", start: "top 70%", toggleActions: "play none none reverse" } },
    );

    gsap.utils.toArray<HTMLElement>(".event-section").forEach((section) => {
      const photo = section.querySelector(".event-visual img");
      const paper = section.querySelector(".event-content");
      if (photo) gsap.to(photo, { yPercent: 8, scale: 1.12, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.3 } });
      if (paper) gsap.fromTo(paper, { opacity: 0.7, y: 45, rotate: section.classList.contains("evening-event") ? -1.5 : 1.5 }, { opacity: 1, y: 0, rotate: 0, ease: "none", scrollTrigger: { trigger: section, start: "top 87%", end: "top 30%", scrub: 1 } });
    });

    gsap.fromTo(
      ".timeline article",
      { opacity: 0.35, x: 25 },
      { opacity: 1, x: 0, stagger: 0.14, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".timeline", start: "top 73%", toggleActions: "play none none reverse" } },
    );
    gsap.fromTo(
      ".evening-content > *",
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".evening-event", start: "top 68%", toggleActions: "play none none reverse" } },
    );

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    requestAnimationFrame(refresh);
    return () => {
      window.removeEventListener("load", refresh);
    };
  }, []);

  // 4. Realistic 3D Arch Page Turn Animation
  useGSAP(() => {
    if (!openingRequested || opened) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onOpenComplete();
      return;
    }

    gsap.set(".opening", { pointerEvents: "none" });
    gsap.set(".opening-book", {
      transformOrigin: "left center",
      transformPerspective: 2200,
    });

    const pageTurn = gsap.timeline({ onComplete: onOpenComplete });

    pageTurn
      // Step 1: Immediate tactile button press feedback
      .to(".opening-button", { scale: 0.94, duration: 0.15, ease: "power2.in" }, 0)
      // Step 2: Radiant golden dawn light expands from behind the arch
      .to(
        ".opening-light",
        { opacity: 0.9, scale: 1.25, duration: 0.85, ease: "power2.out" },
        0.05
      )
      // Step 3: Paper curl shadow deepens dynamically along the inner spine crease
      .to(
        ".card-curl-shadow",
        { opacity: 0.85, duration: 0.45, ease: "power1.inOut" },
        0.08
      )
      // Step 4: Realistic 3D arch page turn rotation around the left spine axis
      .to(
        ".opening-book",
        {
          rotateY: -105,
          xPercent: -22,
          yPercent: -2,
          scale: 1.03,
          duration: 1.35,
          ease: "power2.inOut",
        },
        0.1
      )
      // Step 5: Fade as page reaches perpendicular turn
      .to(
        ".opening-book",
        {
          autoAlpha: 0,
          duration: 0.45,
          ease: "power2.in",
        },
        0.82
      )
      // Step 6: Subtle sacred golden light shimmer
      .to(
        ".opening-flash",
        { autoAlpha: 0.35, duration: 0.3, ease: "power2.out" },
        0.88
      )
      .to(
        ".opening-flash",
        { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" },
        1.12
      )
      // Step 7: Seamless fade into the invitation story
      .to(
        ".opening-backdrop",
        { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" },
        1.05
      )
      .to(".opening", { autoAlpha: 0, duration: 0.25 }, 1.4);
  }, { dependencies: [openingRequested, opened], revertOnUpdate: true });

  // 5. Hero reveal sequence when invitation opens
  useGSAP(() => {
    if (!opened || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      ".hero-copy > *",
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 1, stagger: 0.11, ease: "power2.out", delay: 0.2 },
    );
    gsap.fromTo(
      ".hero-art-wrap",
      { autoAlpha: 0, y: 42, rotate: 4 },
      { autoAlpha: 1, y: 0, rotate: 1.1, duration: 1.4, ease: "power3.out", delay: 0.15 },
    );
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, { dependencies: [opened], revertOnUpdate: true });

  return null;
}
