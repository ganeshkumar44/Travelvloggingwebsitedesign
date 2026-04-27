import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../Button";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchUsers } from "../../../../features/users/usersSlice";
import type { UserListItem } from "../../../../features/users/usersTypes";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

const userTableCell =
  "border-b border-r border-[var(--border)]/80 px-4 py-3 align-top";
const userTableHead =
  "border-b border-r border-[var(--border)]/80 bg-[var(--muted)]/30 px-4 py-3 text-left font-semibold align-middle";

function formatVerifiedLabel(isVerified: boolean): "Verified" | "Not Verified" {
  return isVerified ? "Verified" : "Not Verified";
}

function userRowKey(user: UserListItem, index: number): string {
  if (user.id != null) return `user-${user.id}`;
  if (user.email) return `user-${user.email}`;
  return `user-row-${index}`;
}

export function UsersSection() {
  const dispatch = useAppDispatch();
  const { status: usersStatus, error: usersError, data: usersData } =
    useAppSelector((s) => s.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);

  const isUsersLoading = usersStatus === "loading";

  useEffect(() => {
    if (usersStatus === "idle") {
      void dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  const totalRecords = usersData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return usersData.slice(start, start + pageSize);
  }, [currentPage, pageSize, usersData]);

  const isEmptyList =
    !isUsersLoading && !usersError && totalRecords === 0;

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

        {isEmptyList ? (
          <p className="px-6 py-5 text-sm text-[var(--muted-foreground)]">
            No users found
          </p>
        ) : null}

        {!isUsersLoading && !usersError && totalRecords > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full border-collapse text-sm">
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
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
  );
}
