import React from "react";
import { Navigate, useLocation } from "react-router";
import { AUTH_STORAGE_KEYS } from "../../features/auth/authSession";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const token = sessionStorage.getItem(AUTH_STORAGE_KEYS.accessToken);

  if (!token) {
    return (
      <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
    );
  }

  return <>{children}</>;
}
