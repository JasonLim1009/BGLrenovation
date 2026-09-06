import { useEffect, useRef, useState } from "react";
import "./ambient-music.css";

const VOLUME = 0.35;

export default function AmbientMusic() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("bgl-music-muted") === "true";
  });

  // try to start playback (muted) as soon as the page loads — browsers
  // allow autoplay when muted, then we unmute on the visitor's first
  // interaction with the page (click/scroll/keypress), which satisfies
  // autoplay-with-sound restrictions while still feeling instant.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = VOLUME;
    audio.muted = true;
    audio.play().catch(() => {
      /* autoplay blocked entirely (rare) — visitor can still hit the button */
    });

    if (muted) return; // visitor previously chose mute — leave it muted

    const unmuteOnInteraction = () => {
      audio.muted = false;
      audio.play().catch(() => {});
      setMuted(false);
      localStorage.setItem("bgl-music-muted", "false");
    };

    const events = ["click", "keydown", "touchstart", "scroll"];
    events.forEach((evt) => document.addEventListener(evt, unmuteOnInteraction, { once: true }));

    return () => {
      events.forEach((evt) => document.removeEventListener(evt, unmuteOnInteraction));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    setMuted(next);
    localStorage.setItem("bgl-music-muted", String(next));
    if (!next) audio.play().catch(() => {});
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/audio/ambient.mp3" loop preload="auto" />
      <button
        className="music-toggle-btn"
        onClick={toggleMute}
        aria-label={muted ? "Unmute background music" : "Mute background music"}
        aria-pressed={!muted}
      >
        <ion-icon name={muted ? "volume-mute-outline" : "volume-medium-outline"} aria-hidden="true"></ion-icon>
      </button>
    </>
  );
}
