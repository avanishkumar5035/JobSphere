import React from 'react';
import { cn } from '../../lib/utils';

const Textarea = React.forwardRef(({ className, icon: Icon, rows = 3, ...props }, ref) => {
    return (
        <div className="relative w-full">
            {Icon && (
                <div className="absolute left-3 top-3 text-gray-400">
                    <Icon className="h-4 w-4" />
                </div>
            )}
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    Icon && "pl-10",
                    className
                )}
                rows={rows}
                ref={ref}
                {...props}
            />
        </div>
    );
});

Textarea.displayName = "Textarea";

export { Textarea };
