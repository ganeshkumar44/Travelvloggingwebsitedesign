import React from "react";
import { cn } from "../ui/utils";
import type { DashboardNavId, DashboardNavItemConfig } from "./types";

interface DashboardSidebarProps {
  items: DashboardNavItemConfig[];
  activeId: DashboardNavId;
  onSelect: (id: DashboardNavId) => void;
  className?: string;
}

export function DashboardSidebar({
  items,
  activeId,
  onSelect,
  className,
}: DashboardSidebarProps) {
  return (
    <nav
      className={cn(
        "flex flex-col gap-1 border-[var(--border)] p-3 lg:border-0 lg:p-0",
        className,
      )}
      aria-label="Dashboard"
    >
      <p className="mb-2 hidden px-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] lg:block">
        Menu
      </p>
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={cn(
                  "w-full rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors",
                  "hover:bg-[var(--muted)] hover:text-[var(--primary)]",
                  isActive
                    ? "bg-[var(--muted)] text-[var(--primary)] shadow-sm ring-1 ring-[var(--primary)]/20"
                    : "text-[var(--foreground)]",
                )}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
