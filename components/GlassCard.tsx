import React, { FC, useRef, useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: FC<Props> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const bulbRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  const mouseMoveEvent = (e: MouseEvent) => {
    if (!cardRef.current || !bulbRef.current) return;
    const { x, y } = cardRef.current.getBoundingClientRect();

    bulbRef.current.style.top = `${e.clientY - y - 25}px`;
    bulbRef.current.style.left = `${e.clientX - x - 25}px`;
  };

  const mouseOverEvent = (e: MouseEvent) => {
    setIsHover(true);
  };

  const mouseOutEvent = (e: MouseEvent) => {
    setIsHover(false);
  };

  useEffect(() => {
    if (cardRef) {
      cardRef.current?.addEventListener("mousemove", mouseMoveEvent);
      cardRef.current?.addEventListener("mouseover", mouseOverEvent);
      cardRef.current?.addEventListener("mouseout", mouseOutEvent);
    }

    return () => {
      cardRef.current?.removeEventListener("mousemove", mouseMoveEvent);
      cardRef.current?.removeEventListener("mouseover", mouseOverEvent);
      cardRef.current?.removeEventListener("mouseout", mouseOutEvent);
    };
  }, [cardRef]);

  return (
    <div
      ref={cardRef}
      className={[
        "bg-seasalt bg-opacity-40 backdrop-blur-md rounded-lg p-8 m-4 relative overflow-hidden",
        className,
      ].join(" ")}
    >
      <div
        ref={bulbRef}
        className={[
          `pointer-events-none content-[""] absolute w-16 h-16 rounded-full blur-md bg-gradient-radial from-white to-transparent to-80% opacity-0 transition-opacity duration-200`,
          `${isHover ? "opacity-40" : "opacity-0"}`,
        ].join(" ")}
      />
      {children}
    </div>
  );
};

export default GlassCard;
