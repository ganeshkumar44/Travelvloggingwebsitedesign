import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { CircleUserRound } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../features/auth/authSlice";
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, userEmail, fullName } = useAppSelector((s) => s.auth);
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

  const handleSignOut = () => {
    dispatch(logout());
    setOpen(false);
    onAfterNavigate?.();
    navigate("/sign-in", { replace: true });
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
            to="/dashboard"
            role="menuitem"
            className={cn(
              "block w-full truncate border-b px-4 py-3 text-left text-sm transition-colors",
              isHomePage
                ? "border-white/10 text-gray-200 hover:bg-white/10 hover:text-white"
                : "border-[var(--border)] text-[var(--gray-dark)] hover:bg-[var(--muted)] hover:text-[var(--primary)]",
            )}
            title={displayName}
            onClick={() => {
              setOpen(false);
              onAfterNavigate?.();
            }}
          >
            {displayName}
          </Link>
          <button
            type="button"
            role="menuitem"
            className={cn(
              "w-full px-4 py-3 text-left text-sm font-medium transition-colors",
              isHomePage
                ? "text-[#38BDF8] hover:bg-white/10"
                : "text-[var(--primary)] hover:bg-[var(--muted)]",
            )}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
}
