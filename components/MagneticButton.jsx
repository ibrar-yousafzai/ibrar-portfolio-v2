"use client";

import { useEffect, useState } from "react";

export default function MagneticButton({
  children,
  className = "",
  href,
  type = "button",
  disabled = false,
  ...props
}) {
  const [enabled, setEnabled] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(media.matches && !reduceMotion.matches);
    update();
    media.addEventListener("change", update);
    reduceMotion.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
      reduceMotion.removeEventListener("change", update);
    };
  }, []);

  function handleMouseMove(event) {
    if (!enabled || disabled) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    setOffset({ x, y });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const sharedProps = {
    ...props,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      ...props.style,
      transform: enabled ? `translate3d(${offset.x}px, ${offset.y}px, 0)` : undefined,
      transition: enabled ? "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)" : undefined,
    },
  };

  return href ? (
    <a href={href} {...sharedProps}>
      {children}
    </a>
  ) : (
    <button type={type} disabled={disabled} {...sharedProps}>
      {children}
    </button>
  );
}
