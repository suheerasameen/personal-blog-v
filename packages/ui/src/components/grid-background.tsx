"use client";

import { cn } from "@repo/shadverse/lib/utils";
import { FC } from "react";

interface GridBackgroundProps {
  columns?: number;
  className?: string;
  baseColor?: string;
  dottedColor?: string;
  maxWidthClass?: string;
  hideCenter?: boolean;
}

export const GridBackground: FC<GridBackgroundProps> = ({
  columns = 4,
  className = "",
  maxWidthClass = "container",
  hideCenter = false,
}) => {
  // Create array based on column count
  const columnElements = Array.from({ length: columns }, (_, i) => {
    // Skip middle columns if hideCenter is true
    if (hideCenter && i > 0 && i < columns - 1) {
      return <div key={i} className="h-full w-px" />;
    }
    
    return (
      <div
        key={i}
        className="h-full w-px"
        style={{
          backgroundColor: "transparent",
          backgroundImage: `linear-gradient(180deg, var(--grid-dots-color) 50%, transparent 50%)`,
          backgroundSize: "1px 8px",
        }}
      />
    );
  });

  return (
    <div
      className={`stripe-grid absolute -z-50 inset-0 h-full w-full ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 left-0 h-full w-full"
          aria-hidden="true"
        >
          <div
            className={cn(
              "relative mx-auto grid h-full grid-cols-4 grid-rows-1",
              maxWidthClass
            )}
          >
            {columnElements}
            <div
              className="absolute top-0 right-0 h-full w-px"
              style={{
                backgroundColor: "transparent",
                backgroundImage: `linear-gradient(180deg, var(--grid-dots-color) 50%, transparent 50%)`,
                backgroundSize: "1px 8px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
