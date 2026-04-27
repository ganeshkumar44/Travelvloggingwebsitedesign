import React, { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Lock,
  Settings,
  User,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../ui/utils";
import type { DashboardNavId } from "./types";
import { isDashboardNavGroup, type DashboardNavNode } from "./types";

const NAV_ITEM_ICON: Record<DashboardNavId, LucideIcon> = {
  dashboard: LayoutDashboard,
  stories: FileText,
  profile: User,
  accounts: Lock,
  closeAccount: AlertTriangle,
  users: Users,
};

const iconClassName = "h-4 w-4 shrink-0";

interface DashboardSidebarProps {
  items: DashboardNavNode[];
  activeId: DashboardNavId;
  onSelect: (id: DashboardNavId) => void;
  className?: string;
}

const GROUP_EXPAND_DUR = "duration-200 ease-out";

function groupHasActiveChild(
  node: { children: { id: DashboardNavId }[] },
  activeId: DashboardNavId,
): boolean {
  return node.children.some((c) => c.id === activeId);
}

export function DashboardSidebar({
  items,
  activeId,
  onSelect,
  className,
}: DashboardSidebarProps) {
  const [expandedByLabel, setExpandedByLabel] = useState<Record<string, boolean>>(
    () => {
      const next: Record<string, boolean> = {};
      for (const node of items) {
        if (isDashboardNavGroup(node) && groupHasActiveChild(node, activeId)) {
          next[node.label] = true;
        }
      }
      return next;
    },
  );
  const prevActiveId = useRef(activeId);
  useEffect(() => {
    if (prevActiveId.current === activeId) {
      return;
    }
    prevActiveId.current = activeId;
    for (const node of items) {
      if (isDashboardNavGroup(node) && groupHasActiveChild(node, activeId)) {
        setExpandedByLabel((prev) => ({ ...prev, [node.label]: true }));
      }
    }
  }, [activeId, items]);

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
            const TopIcon = NAV_ITEM_ICON[node.id];
            return (
              <li key={node.id}>
                <button
                  type="button"
                  onClick={() => onSelect(node.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors",
                    "hover:bg-[var(--muted)] hover:text-[var(--primary)]",
                    isActive
                      ? "bg-[var(--muted)] text-[var(--primary)] shadow-sm ring-1 ring-[var(--primary)]/20"
                      : "text-[var(--foreground)]",
                  )}
                >
                  <TopIcon className={iconClassName} aria-hidden />
                  <span>{node.label}</span>
                </button>
              </li>
            );
          }
          const isExpanded = expandedByLabel[node.label] ?? false;
          const hasActiveInSection = groupHasActiveChild(node, activeId);
          return (
            <li key={node.label} className="flex flex-col">
              <button
                type="button"
                onClick={() =>
                  setExpandedByLabel((prev) => ({
                    ...prev,
                    [node.label]: !isExpanded,
                  }))
                }
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors",
                  "hover:bg-[var(--muted)] hover:text-[var(--primary)]",
                  isExpanded
                    ? "bg-[var(--muted)]/50 text-[var(--foreground)]"
                    : "text-[var(--foreground)]",
                  !isExpanded && hasActiveInSection
                    ? "text-[var(--primary)]"
                    : null,
                )}
                aria-expanded={isExpanded}
                aria-controls={`dashboard-group-${node.label}`}
                id={`dashboard-group-trigger-${node.label}`}
              >
                <Settings className={iconClassName} aria-hidden />
                <span className="min-w-0 flex-1">{node.label}</span>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 text-[var(--muted-foreground)] transition-transform will-change-transform",
                    GROUP_EXPAND_DUR,
                    isExpanded && "rotate-90",
                  )}
                  aria-hidden
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows]",
                  GROUP_EXPAND_DUR,
                  isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <ul
                    id={`dashboard-group-${node.label}`}
                    className="mt-0.5 flex flex-col gap-0.5 border-0 pl-6 pt-0.5"
                    role="group"
                    aria-labelledby={`dashboard-group-trigger-${node.label}`}
                  >
                    {node.children.map((child) => {
                      const isActive = child.id === activeId;
                      const SubIcon = NAV_ITEM_ICON[child.id];
                      return (
                        <li key={child.id}>
                          <button
                            type="button"
                            onClick={() => onSelect(child.id)}
                            className={cn(
                              "flex w-full items-center gap-2.5 rounded-lg py-2.5 pl-0 pr-2 text-left text-sm font-medium transition-colors",
                              "hover:bg-[var(--muted)] hover:text-[var(--primary)]",
                              isActive
                                ? "bg-[var(--muted)] text-[var(--primary)] shadow-sm ring-1 ring-[var(--primary)]/20"
                                : "text-[var(--foreground)]",
                            )}
                          >
                            <SubIcon className={iconClassName} aria-hidden />
                            <span>{child.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
