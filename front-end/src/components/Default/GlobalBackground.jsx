import React, { useState, useEffect, useMemo } from "react";
import "./GlobalBackground.css";

const PAWS_COUNT = 160;
const BUBBLES_COUNT = 100;

const GlobalBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      // Normalize mouse position between -1 and 1 based on viewport
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    };

    // window.addEventListener("mousemove", handleMouseMove);
    // return () => {
    //   window.removeEventListener("mousemove", handleMouseMove);
    //   cancelAnimationFrame(animationFrameId);
    // };
  }, []);

  // Generate static random positions for the items entirely across the Document Height
  const paws = useMemo(
    () =>
      Array.from({ length: PAWS_COUNT }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        duration: Math.random() * 20 + 15,
        rotation: Math.random() * 360,
      })),
    []
  );

  const bubbles = useMemo(
    () =>
      Array.from({ length: BUBBLES_COUNT }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 60 + 10,
        delay: Math.random() * 10,
        duration: Math.random() * 25 + 15,
      })),
    []
  );

  return (
    <div className="global-bg-wrapper">
      {/* ── Noise Texture ── */}
      <div className="bg-noise" aria-hidden="true" />

      {/* ── Glowing cursor follower (Fixed to viewport) ── */}
      <div
        className="cursor-glow"
        style={{
          transform: `translate3d(calc(-50% + ${mousePos.x * 50}vw), calc(-50% + ${mousePos.y * 50}vh), 0)`,
        }}
        aria-hidden="true"
      />

      {/* ── Parallax layer for Bubbles ── */}
      {/* <div
        className="bg-parallax-layer bubbles-layer"
        style={{
          transform: `translate3d(${mousePos.x * 50}px, ${mousePos.y * 50}px, 0)`,
        }}
        aria-hidden="true"
      >
        {bubbles.map((bubble) => (
          <div
            key={`bubble-${bubble.id}`}
            className="bubble float-drift"
            style={{
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDelay: `-${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
            }}
          />
        ))}
      </div> */}

      {/* ── Parallax layer for Paws ── */}
      <div
        className="bg-parallax-layer paws-layer"
        style={{
          transform: `translate3d(${mousePos.x * -70}px, ${mousePos.y * -70}px, 0)`,
        }}
        aria-hidden="true"
      >
        {paws.map((paw) => (
          <div
            key={`paw-${paw.id}`}
            className="paw-icon float-drift-fast"
            style={{
              left: `${paw.left}%`,
              top: `${paw.top}%`,
              fontSize: `${paw.size}px`,
              animationDelay: `-${paw.delay}s`,
              animationDuration: `${paw.duration}s`,
            }}
          >
            <div style={{ transform: `rotate(${paw.rotation}deg)` }}>🐾</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalBackground;
