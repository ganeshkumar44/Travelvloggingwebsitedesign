import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { CircleUserRound, LogOut, Settings, User } from "lucide-react";
import { useAppSelector } from "../../store/hooks";
import { performGlobalClientLogout } from "../../lib/globalClientLogout";
import { cn } from "./ui/utils";

interface UserAccountMenuProps {
  isHomePage: boolean;
  iconClassName: string;
  onAfterNavigate?: () => void;
}

export function UserAccountMenu({
  isHomePage,
  iconClassName,
  onAfterNavigate,
}: UserAccountMenuProps) {
  const { accessToken, userEmail, fullName, role, serverProfile } =
    useAppSelector((s) => s.auth);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const authenticated = Boolean(accessToken);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        wrapRef.current &&
        !wrapRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const displayName =
    (fullName && fullName.trim()) || (userEmail && userEmail.trim()) || "—";

  const roleLabel = (() => {
    const r = (role || serverProfile?.role || "").trim();
    if (!r) return "";
    return r
      .split(/[\s_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  })();

  const handleSignOut = () => {
    setOpen(false);
    onAfterNavigate?.();
    performGlobalClientLogout({ source: "manual" });
  };

  if (!authenticated) {
    return (
      <Link
        to="/sign-in"
        aria-label="Sign in"
        className={iconClassName}
        onClick={() => onAfterNavigate?.()}
      >
        <CircleUserRound className="h-6 w-6" strokeWidth={1.75} />
      </Link>
    );
  }

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="true"
        className={iconClassName}
        onClick={() => setOpen((v) => !v)}
      >
        <CircleUserRound className="h-6 w-6" strokeWidth={1.75} />
      </button>
      {open ? (
        <div
          className={cn(
            "absolute right-0 top-full z-[60] mt-2 w-56 min-w-[14rem] rounded-xl border py-2 shadow-[var(--shadow-lg)]",
            isHomePage
              ? "border-white/15 bg-[#12121A]/95 text-white backdrop-blur-xl"
              : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]",
          )}
          role="menu"
        >
          <Link
            to="/dashboard?tab=dashboard"
            role="menuitem"
            className={cn(
              "flex w-full min-w-0 items-start gap-2.5 border-b px-4 py-3 text-left text-sm transition-colors",
              isHomePage
                ? "border-white/10 text-gray-200 hover:bg-white/10 hover:text-white"
                : "border-[var(--border)] text-[var(--gray-dark)] hover:bg-[var(--muted)] hover:text-[var(--primary)]",
            )}
            title={roleLabel ? `${displayName} (${roleLabel})` : displayName}
            onClick={() => {
              setOpen(false);
              onAfterNavigate?.();
            }}
          >
            <User
              className="mt-0.5 h-4 w-4 shrink-0 opacity-90"
              strokeWidth={2}
              aria-hidden
            />
            <span className="min-w-0 flex-1 break-words leading-snug">
              {displayName}
              {roleLabel ? (
                <>
                  {" "}
                  <span
                    className={cn(
                      "ms-0.5 inline align-middle text-[0.7rem] font-medium leading-none",
                      "whitespace-nowrap rounded-md px-1.5 py-1",
                      "bg-neutral-900 text-white",
                      isHomePage && "ring-1 ring-white/10",
                    )}
                  >
                    {roleLabel}
                  </span>
                </>
              ) : null}
            </span>
          </Link>
          <Link
            to="/dashboard?tab=profile"
            role="menuitem"
            className={cn(
              "flex w-full items-center gap-2.5 border-b px-4 py-3 text-left text-sm font-medium transition-colors",
              isHomePage
                ? "border-white/10 text-white hover:bg-white/10"
                : "border-[var(--border)] text-[var(--gray-dark)] hover:bg-[var(--muted)] hover:text-[var(--primary)]",
            )}
            onClick={() => {
              setOpen(false);
              onAfterNavigate?.();
            }}
          >
            <Settings className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            <span>Account Setting</span>
          </Link>
          <button
            type="button"
            role="menuitem"
            className={cn(
              "flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm font-medium transition-colors",
              isHomePage
                ? "text-[#38BDF8] hover:bg-white/10"
                : "text-[var(--primary)] hover:bg-[var(--muted)]",
            )}
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            <span>Sign Out</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
