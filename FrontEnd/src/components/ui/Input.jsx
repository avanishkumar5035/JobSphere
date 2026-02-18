import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, type, icon: Icon, ...props }, ref) => {
    return (
        <div className="relative w-full">
            {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icon className="h-4 w-4" />
                </div>
            )}
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    Icon && "pl-10",
                    className
                )}
                ref={ref}
                {...props}
            />
        </div>
    );
});

Input.displayName = "Input";

export { Input };
