"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export const TextRender = () => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const text = new SplitType(containerRef.current, {
        types: ["words", "chars"],
      });

      gsap.fromTo(
        text.chars,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.001,
          stagger: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom top",
            scrub: 2,
          },
        },
      );

      const highlightEl = containerRef.current.querySelector(".highlight-text");

      if (highlightEl) {
        gsap.to(highlightEl, {
          backgroundSize: "100% 0.08em",
          ease: "none",
          scrollTrigger: {
            trigger: highlightEl,
            start: "top 65%",
            end: "top 45%",
            scrub: 1,
          },
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <div className="about__text-render h-[60vh]" style={{ margin: "20vh 0" }}>
      <p
        ref={containerRef}
        style={{
          lineHeight: "1.2",
          fontSize: "clamp(1.75rem, 5.5vw, 4rem)",
          color: "#fff",
          fontWeight: "500",
        }}
      >
        As a division of{" "}
        <span
          className="highlight-text"
          style={{
            color: "#d4fb08",
            backgroundImage: "linear-gradient(to right, #d4fb08, #d4fb08)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left bottom",
            backgroundSize: "0% 0.08em",
            paddingBottom: "0.05em",
          }}
        >
          Wonder Makers ↗
        </span>
        , a digital product studio fueled by excitement, we specialize in game
        design, Web3 and immersive website development.
      </p>
    </div>
  );
};
