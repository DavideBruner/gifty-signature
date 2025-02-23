import confetti from "canvas-confetti";

export const celebrate = async () => {
  return Promise.all([
    // launch a few confetti from the left edge
    confetti({
      particleCount: 150,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    }),
    // and launch a few from the right edge
    confetti({
      particleCount: 150,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    }),
  ]);
};
