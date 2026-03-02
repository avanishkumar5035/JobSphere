import React, { useMemo } from 'react';

const StarryBackground = () => {
    const stars = useMemo(() => {
        return Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 1}px`,
            animationDuration: `${Math.random() * 4 + 2}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.3,
        }));
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <style>
                {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.1; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.4); }
          }
          .star-light {
            position: absolute;
            border-radius: 50%;
            background-color: currentColor;
            animation: twinkle linear infinite;
          }
        `}
            </style>
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star-light text-primary/40 dark:text-white/80"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                        animationDuration: star.animationDuration,
                        animationDelay: star.animationDelay,
                        opacity: star.opacity,
                    }}
                />
            ))}
        </div>
    );
};

export default StarryBackground;
