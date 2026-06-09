"use client";

import { useCallback, useRef } from "react";

type SoundType = "correct" | "wrong" | "click" | "celebrate";

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.3) => {
      const ctx = getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    },
    [getContext]
  );

  const playSound = useCallback(
    (sound: SoundType) => {
      switch (sound) {
        case "correct":
          // نغمة فرح صاعدة
          playTone(523, 0.15, "sine", 0.4); // Do
          setTimeout(() => playTone(659, 0.15, "sine", 0.4), 100); // Mi
          setTimeout(() => playTone(784, 0.3, "sine", 0.4), 200); // Sol
          break;

        case "wrong":
          // نغمة خطأ هابطة
          playTone(330, 0.2, "square", 0.2);
          setTimeout(() => playTone(260, 0.3, "square", 0.2), 150);
          break;

        case "click":
          // نقرة خفيفة
          playTone(880, 0.05, "sine", 0.2);
          break;

        case "celebrate":
          // نغمة احتفال كاملة
          const notes = [523, 587, 659, 698, 784, 880, 988, 1047];
          notes.forEach((note, i) => {
            setTimeout(() => playTone(note, 0.12, "sine", 0.3), i * 80);
          });
          break;
      }
    },
    [playTone]
  );

  return { playSound };
}
