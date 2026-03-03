import React from 'react';

const LogoIcon = ({ className = "h-12 w-12" }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="globeGrad" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0EA5E9" />
                    <stop offset="1" stopColor="#1E3A8A" />
                </linearGradient>
                <linearGradient id="orbitGrad" x1="10" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0EA5E9" />
                    <stop offset="1" stopColor="#1E3A8A" />
                </linearGradient>
                <linearGradient id="briefcaseGrad" x1="50" y1="35" x2="50" y2="75" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1E3A8A" />
                    <stop offset="1" stopColor="#0F172A" />
                </linearGradient>
                <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                </filter>
            </defs>

            {/* Globe Background */}
            <circle cx="50" cy="50" r="38" fill="url(#globeGrad)" />

            {/* Globe Meridians (Lat/Long Lines) */}
            <path d="M50 12V88" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" />
            <path d="M12 50H88" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" />
            <path d="M50 12C70 12 80 30 80 50C80 70 70 88 50 88C30 88 20 70 20 50C20 30 30 12 50 12" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
            <path d="M12 50C12 70 30 80 50 80C70 80 88 70 88 50C88 30 70 20 50 20C30 20 12 30 12 50" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />

            {/* Orbit Path Swoosh */}
            <path d="M5 50 C 5 75, 40 85, 80 65 C 100 55, 100 45, 95 40 C 90 35, 85 40, 80 45 C 50 75, 15 50, 20 35 C 22 28, 10 20, 5 50 Z" fill="url(#orbitGrad)" filter="url(#shadow)" />

            {/* Briefcase Base */}
            {/* Handle */}
            <path d="M35 38 V 32 C 35 28, 40 26, 45 26 H 55 C 60 26, 65 28, 65 32 V 38" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* Body */}
            <rect x="20" y="38" width="60" height="34" rx="4" fill="url(#briefcaseGrad)" filter="url(#shadow)" />

            {/* Top Flap line */}
            <path d="M20 52 C 40 54, 60 54, 80 52" stroke="#334155" strokeWidth="2" fill="none" />

            {/* Clasp/Buckle */}
            <rect x="44" y="50" width="12" height="6" rx="1.5" fill="white" />

            {/* Map Pin Hovering on Left Side */}
            <g transform="translate(-10, -5)" filter="url(#shadow)">
                <path d="M32 20 C 26.5 20, 22 24.5, 22 30 C 22 36.5, 32 46, 32 46 C 32 46, 42 36.5, 42 30 C 42 24.5, 37.5 20, 32 20 Z" fill="#1E3A8A" />
                <circle cx="32" cy="28" r="3.5" fill="white" />
            </g>
        </svg>
    );
};

export default LogoIcon;
