import { useId } from "react";

export function InstagramIcon({ size = 26, className = "" }: { size?: number; className?: string }) {
  const rawId = useId();
  const gradientId = `instagram-gradient-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id={gradientId}
          cx="0.3"
          cy="1.05"
          r="1.3"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#E63B80" />
          <stop offset="75%" stopColor="#A033B5" />
          <stop offset="100%" stopColor="#5B51D8" />
        </radialGradient>
      </defs>
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill={`url(#${gradientId})`} />
      <rect
        x="5.5"
        y="5.5"
        width="13"
        height="13"
        rx="4.2"
        stroke="#FFFFFF"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3.4" stroke="#FFFFFF" strokeWidth="1.6" />
      <circle cx="16.9" cy="7.1" r="1.15" fill="#FFFFFF" />
    </svg>
  );
}
