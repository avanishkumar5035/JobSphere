import React from 'react';

const LogoIcon = ({ className = "h-6 w-6" }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Outer rotating hexagon */}
            <path
                d="M12 2L20.6603 7V17L12 22L3.33975 17V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="origin-center animate-[spin_8s_linear_infinite]"
            />
            {/* Inner pulsating star */}
            <path
                d="M12 6L13.5 10.5L18 12L13.5 13.5L12 18L10.5 13.5L6 12L10.5 10.5L12 6Z"
                fill="currentColor"
                className="origin-center animate-pulse"
            />
            {/* Nodes */}
            <circle cx="12" cy="2" r="1.5" fill="currentColor" className="animate-bounce" style={{ animationDuration: '2s' }} />
            <circle cx="20.66" cy="17" r="1.5" fill="currentColor" className="animate-bounce" style={{ animationDuration: '2.5s' }} />
            <circle cx="3.34" cy="17" r="1.5" fill="currentColor" className="animate-bounce" style={{ animationDuration: '3s' }} />
        </svg>
    );
};

export default LogoIcon;
