"use client";

import type { Post } from "@/lib/notion-utils";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { BaseComponentProps } from "@/lib/component-types";

interface PostListItemProps extends BaseComponentProps {
  /** Post data to display */
  post: Post;
}

const columnHelper = createColumnHelper<Post>();

const columns = [
  columnHelper.accessor("name", {
    header: () => null,
    cell: (info) => (
      <h5 className="m-0 truncate font-sans text-[11px] leading-none transition-colors group-hover:text-orange">
        {info.getValue()}
      </h5>
    ),
  }),
  columnHelper.accessor(
    (row) => ({
      seriesName: row.seriesName,
      partNumber: row.partNumber,
    }),
    {
      id: "series",
      header: () => null,
      cell: (info) => {
        const { seriesName, partNumber } = info.getValue();
        return (
          <div className="truncate text-orange text-xs leading-none">
            {seriesName ? (partNumber ? `${seriesName} • Part ${partNumber}` : seriesName) : ""}
          </div>
        );
      },
    }
  ),
  columnHelper.accessor("publishDate", {
    header: () => null,
    cell: (info) => (
      <div className="whitespace-nowrap text-muted-foreground text-xs leading-none">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("type", {
    header: () => null,
    cell: (info) => (
      <div className="whitespace-nowrap text-muted-foreground text-xs leading-none">
        {info.getValue()}
      </div>
    ),
    size: 90,
  }),
  columnHelper.accessor("readTime", {
    header: () => null,
    cell: (info) => (
      <div className="whitespace-nowrap text-muted-foreground text-xs leading-none">
        {info.getValue()}m
      </div>
    ),
    size: 60,
  }),
];

/**
 * Render a single post inside a fixed-layout table row.
 *
 * @param props - Props containing the `post` data to display.
 * @returns A hoverable row showing key post metadata.
 */
export function PostListItem({ post, className, testId }: PostListItemProps) {
  const table = useReactTable({
    data: [post],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={`transition-colors hover:bg-muted/40 ${className || ""}`} data-testid={testId}>
      <div
        className="grid items-center gap-2 px-1 py-2"
        style={{ gridTemplateColumns: "1fr 1fr 110px 90px 72px" }}
      >
        {table
          .getRowModel()
          .rows[0]?.getVisibleCells()
          .map((cell) => (
            <div className="flex h-6 min-w-0 items-center" key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
      </div>
    </div>
  );
}
