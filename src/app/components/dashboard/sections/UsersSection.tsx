import React, { useEffect, useMemo, useState } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "../../Button";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchUsers } from "../../../../features/users/usersSlice";
import type { UserListItem } from "../../../../features/users/usersTypes";
import { DashboardTextField } from "../DashboardFormField";
import { isAdminRole } from "../dashboardUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

const userTableCell =
  "border-b border-r border-[var(--border)]/80 px-4 py-3 align-top";
const userTableHead =
  "border-b border-r border-[var(--border)]/80 bg-[var(--muted)]/30 px-4 py-3 text-left font-semibold align-middle";

type UserListFilters = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: string;
  phone: string;
  gender: string;
};

const INITIAL_USER_FILTERS: UserListFilters = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  isVerified: "",
  phone: "",
  gender: "",
};

function FilledFilterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      <path
        d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"
        fill="currentColor"
      />
    </svg>
  );
}

function formatVerifiedLabel(isVerified: boolean): "Verified" | "Not Verified" {
  return isVerified ? "Verified" : "Not Verified";
}

function userRowKey(user: UserListItem, index: number): string {
  if (user.id != null) return `user-${user.id}`;
  if (user.email) return `user-${user.email}`;
  return `user-row-${index}`;
}

function UserRowActionsMenu({ isAdmin }: { isAdmin: boolean }) {
  if (!isAdmin) {
    return (
      <span className="text-[var(--muted-foreground)]" aria-hidden>
        —
      </span>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/30"
          aria-label="Open user actions"
        >
          <MoreVertical className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        <DropdownMenuItem onSelect={() => {}}>Edit</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => {}} variant="destructive">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UsersSection() {
  const dispatch = useAppDispatch();
  const role = useAppSelector((s) => s.auth.role);
  const isAdmin = isAdminRole(role);
  const { status: usersStatus, error: usersError, data: usersData } =
    useAppSelector((s) => s.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
  const [filters, setFilters] = useState<UserListFilters>(INITIAL_USER_FILTERS);
  const [userListFiltersVisible, setUserListFiltersVisible] = useState(false);

  const isUsersLoading = usersStatus === "loading";

  useEffect(() => {
    if (usersStatus === "idle") {
      void dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  const filteredUsers = useMemo(() => {
    const fFirst = filters.firstName.trim().toLowerCase();
    const fLast = filters.lastName.trim().toLowerCase();
    const fEmail = filters.email.trim().toLowerCase();
    const fRole = filters.role.trim().toLowerCase();
    const fVerified = filters.isVerified.trim().toLowerCase();
    const fPhone = filters.phone.trim().toLowerCase();
    const fGender = filters.gender.trim().toLowerCase();

    return usersData.filter((user) => {
      const first = (user.firstname ?? "").toLowerCase();
      const last = (user.lastname ?? "").toLowerCase();
      const email = (user.email ?? "").toLowerCase();
      const r = (user.role ?? "").toLowerCase();
      const verifiedLabel = formatVerifiedLabel(user.is_verified).toLowerCase();
      const phone = (user.phone ?? "").toLowerCase();
      const gender = (user.gender ?? "").toLowerCase();

      return (
        first.includes(fFirst) &&
        last.includes(fLast) &&
        email.includes(fEmail) &&
        r.includes(fRole) &&
        verifiedLabel.includes(fVerified) &&
        phone.includes(fPhone) &&
        gender.includes(fGender)
      );
    });
  }, [filters, usersData]);

  const totalRecords = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  const isUsersListEmpty =
    !isUsersLoading && !usersError && usersData.length === 0;
  const hasNoMatchingFilteredUsers =
    !isUsersLoading && !usersError && usersData.length > 0 && totalRecords === 0;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [currentPage, pageSize, filteredUsers]);

  const updateFilter = (key: keyof UserListFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Users
        </h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          View and manage user accounts.
        </p>
      </div>

      <div className="space-y-4">
        {!isUsersListEmpty ? (
          <div className="flex w-full justify-end">
            <button
              type="button"
              onClick={() => setUserListFiltersVisible((v) => !v)}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-[var(--primary)] text-white shadow-sm transition-[background-color,box-shadow] hover:bg-[var(--primary)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/30"
              aria-label={
                userListFiltersVisible
                  ? "Hide user filters"
                  : "Show user filters"
              }
              aria-expanded={userListFiltersVisible}
            >
              <FilledFilterIcon className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        {!isUsersListEmpty && userListFiltersVisible ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow-sm)]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <DashboardTextField
                id="users-filter-first-name"
                label="First Name"
                value={filters.firstName}
                onChange={(e) => updateFilter("firstName", e.target.value)}
                placeholder="Search first name"
              />
              <DashboardTextField
                id="users-filter-last-name"
                label="Last Name"
                value={filters.lastName}
                onChange={(e) => updateFilter("lastName", e.target.value)}
                placeholder="Search last name"
              />
              <DashboardTextField
                id="users-filter-email"
                label="Email"
                value={filters.email}
                onChange={(e) => updateFilter("email", e.target.value)}
                placeholder="Search email"
              />
              <DashboardTextField
                id="users-filter-role"
                label="Role"
                value={filters.role}
                onChange={(e) => updateFilter("role", e.target.value)}
                placeholder="Search role"
              />
              <DashboardTextField
                id="users-filter-is-verified"
                label="Is Verified"
                value={filters.isVerified}
                onChange={(e) => updateFilter("isVerified", e.target.value)}
                placeholder="Search verified status"
              />
              <DashboardTextField
                id="users-filter-phone"
                label="Phone"
                value={filters.phone}
                onChange={(e) => updateFilter("phone", e.target.value)}
                placeholder="Search phone"
              />
              <DashboardTextField
                id="users-filter-gender"
                label="Gender"
                value={filters.gender}
                onChange={(e) => updateFilter("gender", e.target.value)}
                placeholder="Search gender"
              />
            </div>
          </div>
        ) : null}

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
          {usersError ? (
            <p className="px-6 py-5 text-sm text-red-600" role="alert">
              {usersError}
            </p>
          ) : null}

          {isUsersLoading ? (
            <p className="px-6 py-5 text-sm text-[var(--muted-foreground)]">
              Loading users...
            </p>
          ) : null}

          {isUsersListEmpty ? (
            <p className="px-6 py-5 text-sm text-[var(--muted-foreground)]">
              No users found
            </p>
          ) : null}

          {hasNoMatchingFilteredUsers ? (
            <p className="px-6 py-5 text-sm text-[var(--muted-foreground)]">
              No users found
            </p>
          ) : null}

          {!isUsersLoading && !usersError && totalRecords > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-[1000px] w-full border-collapse text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className={userTableHead}>First Name</th>
                      <th className={userTableHead}>Last Name</th>
                      <th
                        className={`min-w-0 max-w-xs ${userTableHead}`}
                      >
                        Email Id
                      </th>
                      <th className={userTableHead}>Role</th>
                      <th className={userTableHead}>Is Verified</th>
                      <th className={userTableHead}>Phone</th>
                      <th className={userTableHead}>Gender</th>
                      <th
                        className={`w-[88px] text-right ${userTableHead}`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user, index) => (
                      <tr key={userRowKey(user, index)} className="align-top">
                        <td className={userTableCell}>
                          {user.firstname || "-"}
                        </td>
                        <td className={userTableCell}>
                          {user.lastname || "-"}
                        </td>
                        <td
                          className={`min-w-0 max-w-xs break-words ${userTableCell}`}
                        >
                          {user.email || "-"}
                        </td>
                        <td className={userTableCell}>
                          {user.role || "-"}
                        </td>
                        <td className={userTableCell}>
                          {formatVerifiedLabel(user.is_verified)}
                        </td>
                        <td className={userTableCell}>
                          {user.phone || "-"}
                        </td>
                        <td className={userTableCell}>
                          {user.gender || "-"}
                        </td>
                        <td
                          className={`w-[88px] whitespace-nowrap text-right ${userTableCell} align-middle`}
                        >
                          <div className="inline-flex justify-end">
                            <UserRowActionsMenu isAdmin={isAdmin} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-4 border-t border-[var(--border)] px-4 py-4 sm:px-6">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Showing{" "}
                    <span className="font-medium text-[var(--foreground)]">
                      {totalRecords === 0
                        ? 0
                        : (currentPage - 1) * pageSize + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-[var(--foreground)]">
                      {Math.min(currentPage * pageSize, totalRecords)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-[var(--foreground)]">
                      {totalRecords}
                    </span>
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((p) => Math.max(1, p - 1))
                      }
                      disabled={currentPage <= 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-[var(--muted-foreground)]">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage >= totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="users-page-size"
                    className="text-sm text-[var(--muted-foreground)]"
                  >
                    Rows per page
                  </label>
                  <select
                    id="users-page-size"
                    className="rounded-md border border-[var(--border)] bg-[var(--input-background)] px-2.5 py-1.5 text-sm"
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    {PAGE_SIZE_OPTIONS.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
