import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* 
        Vector Shield Logo mimicking the uploaded image:
        - Sage Green to Teal/Cyan Gradient
        - Center T shape where the stem curves into a friendly supporting hand
        - Top-right delicate network node graph demonstrating AI connectivity
      */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 drop-shadow-sm transform hover:scale-105 transition-transform duration-300"
      >
        <defs>
          {/* Main gradient matching Sage for TolakHalus */}
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A8C3A0" />
            <stop offset="50%" stopColor="#9BC0B4" />
            <stop offset="100%" stopColor="#5E9F97" />
          </linearGradient>
          
          {/* Highlight overlay for premium glassy look */}
          <linearGradient id="glassHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Shield Shape */}
        <path
          d="M100 25 C132 25, 170 38, 170 82 C170 135, 128 168, 100 178 C72 168, 30 135, 30 82 C30 38, 68 25, 100 25 Z"
          fill="url(#shieldGrad)"
        />

        {/* Glass Highlight Overlay on left half */}
        <path
          d="M100 25 C68 25, 30 38, 30 82 C30 115, 48 141, 68 156 C61 115, 75 60, 100 25 Z"
          fill="url(#glassHighlight)"
          opacity="0.6"
        />

        {/* Network Nodes (Top-Right) */}
        <g stroke="white" strokeWidth="2.5" opacity="0.85">
          {/* Line links */}
          <line x1="120" y1="52" x2="148" y2="48" />
          <line x1="148" y1="48" x2="152" y2="76" />
          <line x1="120" y1="52" x2="135" y2="70" />
          <line x1="135" y1="70" x2="152" y2="76" />
          <line x1="135" y1="70" x2="148" y2="48" />

          {/* Node Circles */}
          <circle cx="120" cy="52" r="5" fill="#FAFAF8" />
          <circle cx="148" cy="48" r="4.5" fill="#FAFAF8" />
          <circle cx="152" cy="76" r="5.5" fill="#FAFAF8" />
          <circle cx="135" cy="70" r="4" fill="#FAFAF8" />
        </g>

        {/* Hand & 'T' Letter Combination */}
        <g fill="none" stroke="#FAFAF8" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
          {/* Top Bar of the 'T' - elegant curve */}
          <path d="M72 75 C90 73, 110 73, 128 75" />
          
          {/* Stem of the 'T' merging into the supporting hand swoop */}
          {/* Smooth bezier curves starting from stem into wrapping hand */}
          <path d="M100 76 V112 C100 128, 86 138, 70 128 C56 118, 54 94, 76 84 C90 78, 120 84, 134 116 " />
        </g>
      </svg>

      {/* Main text component */}
      {showText && (
        <div className="flex items-center space-x-1">
          <span className="text-xl font-bold tracking-tight text-[#1E1E1E] dark:text-[#FAFAFA]">
            Tolak<span className="text-[#8ECFC9] dark:text-[#A8C3A0]">Halus</span>
          </span>

          {/* Customized AI rounded badge matching the image logo:
              - Slate-teal fill
              - Miniature dotted constellation graphic on the left of "AI"
          */}
          <span className="inline-flex items-center space-x-0.5 px-2 py-0.5 rounded-lg bg-[#306C66] dark:bg-[#438a82] text-white font-extrabold text-[12px] h-[24px]">
            {/* Minimal node connector inside badge */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mr-0.5" stroke="currentColor" strokeWidth="2.5">
              <circle cx="7" cy="7" r="2" fill="currentColor" />
              <circle cx="17" cy="11" r="2.5" fill="currentColor" />
              <circle cx="10" cy="17" r="2" fill="currentColor" />
              <line x1="7" y1="7" x2="17" y2="11" />
              <line x1="10" y1="17" x2="17" y2="11" />
            </svg>
            <span>AI</span>
          </span>
        </div>
      )}
    </div>
  );
}
