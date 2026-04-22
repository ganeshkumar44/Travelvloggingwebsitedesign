import React, { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { useSearchParams } from "react-router";
import { useAppSelector } from "../../../store/hooks";
import { cn } from "../ui/utils";
import { getVisibleNavStructure, isDashboardTabValue } from "./dashboardNav";
import { isAdminRole } from "./dashboardUtils";
import { DashboardSidebar } from "./DashboardSidebar";
import type { DashboardNavId } from "./types";
import { AccountsSection } from "./sections/AccountsSection";
import { CloseAccountSection } from "./sections/CloseAccountSection";
import { DashboardHomeSection } from "./sections/DashboardHomeSection";
import { ProfileDetailsSection } from "./sections/ProfileDetailsSection";
import { StoriesSection } from "./sections/StoriesSection";
import { UsersSection } from "./sections/UsersSection";

function renderSection(id: DashboardNavId) {
  switch (id) {
    case "dashboard":
      return <DashboardHomeSection />;
    case "profile":
      return <ProfileDetailsSection />;
    case "accounts":
      return <AccountsSection />;
    case "closeAccount":
      return <CloseAccountSection />;
    case "stories":
      return <StoriesSection />;
    case "users":
      return <UsersSection />;
    default:
      return <DashboardHomeSection />;
  }
}

export default function DashboardLayout() {
  const role = useAppSelector((s) => s.auth.role);
  const isAdmin = useMemo(() => isAdminRole(role), [role]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeId, setActiveId] = useState<DashboardNavId>(() => {
    if (typeof window === "undefined") return "dashboard";
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab && isDashboardTabValue(tab)) {
      return tab;
    }
    return "dashboard";
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleNav = useMemo(
    () => getVisibleNavStructure(isAdmin),
    [isAdmin],
  );

  useEffect(() => {
    if (activeId === "users" && !isAdmin) {
      setActiveId("dashboard");
    }
  }, [activeId, isAdmin]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab == null) return;
    if (!isDashboardTabValue(tab)) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("tab");
        return next;
      }, { replace: true });
      return;
    }
    if (tab === "users" && !isAdmin) {
      setActiveId("dashboard");
    } else {
      setActiveId(tab);
    }
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("tab");
      return next;
    }, { replace: true });
  }, [searchParams, isAdmin, setSearchParams]);

  const handleSelect = (id: DashboardNavId) => {
    setActiveId(id);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gray-light)] via-white to-[var(--gray-light)] pb-12 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4 lg:mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Manage your account and content.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-sm transition-colors hover:bg-[var(--muted)] lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="dashboard-sidebar-panel"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          {mobileOpen ? (
            <button
              type="button"
              className="fixed inset-0 z-30 bg-black/40 lg:hidden"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
          ) : null}

          <aside
            id="dashboard-sidebar-panel"
            className={cn(
              "fixed left-0 top-20 z-40 h-[calc(100dvh-5rem)] w-[min(18rem,88vw)] overflow-y-auto border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-xl)] transition-transform duration-200 ease-out lg:static lg:z-0 lg:h-auto lg:max-h-none lg:w-64 lg:shrink-0 lg:translate-x-0 lg:shadow-[var(--shadow-sm)]",
              mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            )}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-[var(--border)] px-4 py-3 lg:hidden">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                Menu
              </span>
              <button
                type="button"
                className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <DashboardSidebar
              items={visibleNav}
              activeId={activeId}
              onSelect={handleSelect}
              className="p-3 lg:p-4"
            />
          </aside>

          <main className="min-w-0 flex-1 border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow-sm)] sm:p-8 lg:min-h-[480px]">
            {renderSection(activeId)}
          </main>
        </div>
      </div>
    </div>
  );
}
