"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function MotionDirector({ opened, openingRequested, onOpenComplete }: { opened: boolean; openingRequested: boolean; onOpenComplete: () => void }) {
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
      ".ceremony-garland",
      { autoAlpha: 0, y: -18 },
      { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: ".morning-event", start: "top 75%", toggleActions: "play none none reverse" } },
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
      const garlandX = gsap.quickTo(".opening-garland", "x", { duration: 1, ease: "power2.out" });
      onMove = (event: PointerEvent) => {
        const bounds = book.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        coupleX(x * 25); coupleY(y * 18);
        templeX(x * -13); templeY(y * -11);
        coloradoX(x * 32); coloradoY(y * 22);
        garlandX(x * -7);
      };
      onLeave = () => { coupleX(0); coupleY(0); templeX(0); templeY(0); coloradoX(0); coloradoY(0); garlandX(0); };
      book.addEventListener("pointermove", onMove);
      book.addEventListener("pointerleave", onLeave);
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    requestAnimationFrame(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      if (book && onMove && onLeave) {
        book.removeEventListener("pointermove", onMove);
        book.removeEventListener("pointerleave", onLeave);
      }
    };
  }, []);

  useGSAP(() => {
    if (!openingRequested || opened) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onOpenComplete();
      return;
    }

    const mobile = window.matchMedia("(max-width: 650px)").matches;
    gsap.set(".opening", { pointerEvents: "none" });
    gsap.set(".opening-book", { transformOrigin: mobile ? "left center" : "50% 50%" });
    gsap.set(".opening-book-left", { backfaceVisibility: "hidden" });

    const pageTurn = gsap.timeline({ onComplete: onOpenComplete });
    pageTurn
      .to(".opening-button", { scale: 0.96, duration: 0.18, ease: "power2.in" }, 0)
      .to(".opening-light", { opacity: 0.88, scale: 1.16, duration: 1.15, ease: "power2.out" }, 0.05)
      .to(".opening-garland", { y: -24, rotation: -2, duration: 0.85, ease: "power2.out" }, 0.15)
      .to(".cover-couple-cutout", { y: -32, scale: 1.045, duration: 0.85, ease: "power2.out" }, 0.16)
      .to(".cover-temple-card", { x: 24, y: -13, rotation: 9, duration: 0.88, ease: "power2.out" }, 0.19)
      .to(".cover-colorado-card", { x: 38, y: 14, rotation: 16, duration: 0.78, ease: "power2.out" }, 0.22)
      .to(".opening-book", { scale: 1.045, rotationZ: -0.6, duration: 0.52, ease: "power2.out" }, 0.2);

    if (mobile) {
      pageTurn.to(".opening-mobile-copy", { autoAlpha: 0, y: -18, duration: 0.48, ease: "power2.in" }, 0.42);
    } else {
      pageTurn.to(".opening-book-left", { rotationY: -155, duration: 1.6, ease: "power3.inOut" }, 0.48);
    }

    pageTurn
      .to(".opening-book", { rotationY: mobile ? -72 : -24, xPercent: mobile ? 0 : -10, scale: mobile ? 0.88 : 0.89, rotationZ: mobile ? -3 : -1.4, duration: 1.55, ease: "power3.inOut" }, 0.62)
      .to(".opening-backdrop", { autoAlpha: 0, duration: 1.25, ease: "power2.inOut" }, 0.78)
      .to(".opening-light", { opacity: 0.06, duration: 0.9, ease: "power2.inOut" }, 1.14)
      .to(".opening-flash", { autoAlpha: 0.44, duration: 0.52, ease: "power2.out" }, 0.97)
      .to(".opening-flash", { autoAlpha: 0, duration: 0.65, ease: "power2.inOut" }, 1.5)
      .to(".opening", { autoAlpha: 0, duration: 0.86, ease: "power2.inOut" }, 1.6);
  }, { dependencies: [openingRequested, opened], revertOnUpdate: true });

  useGSAP(() => {
    if (!opened || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      ".hero-copy > *",
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 1, stagger: 0.11, ease: "power2.out", delay: 0.25 },
    );
    gsap.fromTo(
      ".hero-art-wrap",
      { autoAlpha: 0, y: 42, rotate: 4 },
      { autoAlpha: 1, y: 0, rotate: 1.1, duration: 1.4, ease: "power3.out", delay: 0.2 },
    );
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, { dependencies: [opened], revertOnUpdate: true });

  return null;
}
