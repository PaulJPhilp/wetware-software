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
      <h5 className="m-0 truncate text-[11px] leading-none font-sans group-hover:text-orange transition-colors">
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
          <div className="text-xs leading-none text-orange truncate">
            {seriesName ? (partNumber ? `${seriesName} • Part ${partNumber}` : seriesName) : ""}
          </div>
        );
      },
    },
  ),
  columnHelper.accessor("publishDate", {
    header: () => null,
    cell: (info) => (
      <div className="text-xs leading-none text-muted-foreground whitespace-nowrap">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("type", {
    header: () => null,
    cell: (info) => (
      <div className="text-xs leading-none text-muted-foreground whitespace-nowrap">
        {info.getValue()}
      </div>
    ),
    size: 90,
  }),
  columnHelper.accessor("readTime", {
    header: () => null,
    cell: (info) => (
      <div className="text-xs leading-none text-muted-foreground whitespace-nowrap">
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
    <div className={`hover:bg-muted/40 transition-colors ${className || ""}`} data-testid={testId}>
      <div
        className="grid items-center gap-2 px-1 py-2"
        style={{ gridTemplateColumns: "1fr 1fr 110px 90px 72px" }}
      >
        {table
          .getRowModel()
          .rows[0]?.getVisibleCells()
          .map((cell) => (
            <div key={cell.id} className="min-w-0 flex items-center h-6">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
      </div>
    </div>
  );
}
