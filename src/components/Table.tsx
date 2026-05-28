import clsx from "clsx";
import type { ReactNode } from "react";

export type TableColumn<T> = {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
  className?: string;
};

export default function Table<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = "No data to display.",
  className,
}: TableProps<T>) {
  return (
    <div
      className={clsx(
        "w-full overflow-x-auto bg-white border border-econet-border rounded-lg shadow-soft scrollbar-thin",
        className
      )}
    >
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-econet-surface text-left text-xs font-semibold uppercase tracking-wide text-econet-grey">
            {columns.map((col) => (
              <th
                key={col.key}
                style={col.width ? { width: col.width } : undefined}
                className={clsx(
                  "px-4 py-3",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center"
                )}
                scope="col"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-econet-border">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-econet-grey"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={rowKey(row)}
                className="text-econet-ink hover:bg-econet-surface/50 transition-colors duration-150"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={clsx(
                      "px-4 py-3 align-middle",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center"
                    )}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
