import React from "react";
import { cn } from "../ui/utils";
import type { DashboardNavId } from "./types";
import { isDashboardNavGroup, type DashboardNavNode } from "./types";

interface DashboardSidebarProps {
  items: DashboardNavNode[];
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
        {items.map((node) => {
          if (!isDashboardNavGroup(node)) {
            const isActive = node.id === activeId;
            return (
              <li key={node.id}>
                <button
                  type="button"
                  onClick={() => onSelect(node.id)}
                  className={cn(
                    "w-full rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors",
                    "hover:bg-[var(--muted)] hover:text-[var(--primary)]",
                    isActive
                      ? "bg-[var(--muted)] text-[var(--primary)] shadow-sm ring-1 ring-[var(--primary)]/20"
                      : "text-[var(--foreground)]",
                  )}
                >
                  {node.label}
                </button>
              </li>
            );
          }
          return (
            <li key={node.label} className="pt-1">
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                {node.label}
              </p>
              <ul className="ml-1.5 flex flex-col gap-0.5 border-l border-[var(--border)] pl-2" role="group" aria-label={node.label}>
                {node.children.map((child) => {
                  const isActive = child.id === activeId;
                  return (
                    <li key={child.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(child.id)}
                        className={cn(
                          "w-full rounded-lg py-2.5 pl-2 pr-2 text-left text-sm font-medium transition-colors",
                          "hover:bg-[var(--muted)] hover:text-[var(--primary)]",
                          isActive
                            ? "bg-[var(--muted)] text-[var(--primary)] shadow-sm ring-1 ring-[var(--primary)]/20"
                            : "text-[var(--foreground)]",
                        )}
                      >
                        {child.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
