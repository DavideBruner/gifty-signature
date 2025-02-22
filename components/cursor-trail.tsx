"use client";
import React, { useEffect, useCallback, useRef, useState } from "react";

interface SparkleStyle {
  position: "absolute";
  top: number;
  left: number;
  width: string;
  height: string;
  borderRadius: string;
  background: string;
  animation: string | undefined;
  pointerEvents: "none";
}

interface Sparkle {
  id: string;
  style: SparkleStyle;
  createdAt: number;
}

const CursorTrailEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const trailArr = [1, 0.9, 0.8, 0.5, 0.25, 0.6, 0.4, 0.3, 0.2];

  const createSparkleStyle = useCallback(
    (e: React.MouseEvent, i: number, containerRect: DOMRect): SparkleStyle => {
      const j = (1 - i) * 50;
      const size = Math.ceil(Math.random() * 10 * i);

      return {
        position: "absolute",
        top:
          e.clientY - containerRect.top + Math.round(Math.random() * j - j / 2),
        left:
          e.clientX -
          containerRect.left +
          Math.round(Math.random() * j - j / 2),
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${size}px`,
        background: `hsla(${Math.round(Math.random() * 160)}, 60%, 90%, ${i})`,
        animation:
          Math.random() > 0.5 ? "fallingsparkles 1s forwards" : undefined,
        pointerEvents: "none",
      };
    },
    []
  );

  const createSparkle = useCallback(
    (e: React.MouseEvent, i: number, containerRect: DOMRect): Sparkle => {
      const id = `sparkle-${Date.now()}-${Math.random()}`;
      const style = createSparkleStyle(e, i, containerRect);

      return {
        id,
        style,
        createdAt: Date.now(),
      };
    },
    [createSparkleStyle]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newSparkles = trailArr.flatMap((i) => [
        createSparkle(e, i, containerRect),
        createSparkle(e, i, containerRect),
      ]);

      setSparkles((prev) => [...prev, ...newSparkles]);
    },
    [createSparkle]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setSparkles((prev) =>
        prev.filter((sparkle) => now - sparkle.createdAt < 1000)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {sparkles.map((sparkle) => (
        <div key={sparkle.id} className="absolute" style={sparkle.style} />
      ))}
      <style>
        {`
          @keyframes fallingsparkles {
            from { transform: translateY(0); }
            to { transform: translateY(50px); }
          }
        `}
      </style>
    </div>
  );
};

export default CursorTrailEffect;
