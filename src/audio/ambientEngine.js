let ctx = null;
let masterGain = null;
let started = false;
const voices = [];

// A soft, slow-moving ambient pad built from a few detuned sine oscillators
// tuned to a calm open chord (A2 root, perfect fifth, octave), each with its
// own slow LFO "breathing" the volume up and down, run through a warm
// lowpass filter. No copyrighted material involved - it's synthesized live.
function buildGraph() {
  ctx = new (window.AudioContext || window.webkitAudioContext)();

  masterGain = ctx.createGain();
  masterGain.gain.value = 0.16; // stays quiet - background ambience, not foreground music
  masterGain.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.connect(masterGain);

  // subtle stereo-ish delay for a little space/depth
  const delay = ctx.createDelay();
  delay.delayTime.value = 0.6;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.18;
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(filter);

  const chordFreqs = [110, 164.81, 220, 277.18]; // A2, E3, A3, C#4 - open, calm

  chordFreqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    const voiceGain = ctx.createGain();
    voiceGain.gain.value = 0;

    // slow LFO on this voice's gain, gives the "breathing" swell
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05 + i * 0.015; // very slow, each voice slightly different
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 0.5;
    lfo.connect(lfoDepth);
    lfoDepth.connect(voiceGain.gain);

    osc.connect(voiceGain);
    voiceGain.connect(filter);
    voiceGain.connect(delay);

    osc.start();
    lfo.start();

    // ramp this voice in gently over a few seconds instead of a hard start
    voiceGain.gain.setValueAtTime(0, ctx.currentTime);
    voiceGain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 4 + i);

    voices.push({ osc, lfo, voiceGain });
  });
}

export function initAmbientAudio() {
  if (started || typeof window === "undefined") return;
  started = true;
  buildGraph();
}

export async function resumeAmbientAudio() {
  if (!started) initAmbientAudio();
  if (ctx && ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      // ignore - will retry on next user gesture
    }
  }
}

export function setAmbientVolume(value) {
  if (!masterGain || !ctx) return;
  masterGain.gain.linearRampToValueAtTime(value, ctx.currentTime + 0.4);
}
