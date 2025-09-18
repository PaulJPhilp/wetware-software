import type { Post } from "@/lib/notion-utils";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

interface PostListItemProps {
  post: Post;
}

const columnHelper = createColumnHelper<Post>();

const columns: ColumnDef<Post, any>[] = [
  columnHelper.accessor("name", {
    header: "Title",
    cell: (info) => (
      <h5 className="m-0 truncate text-xs leading-none font-sans group-hover:text-orange transition-colors">
        {info.getValue()}
      </h5>
    ),
    size: undefined, // flexible
  }),
  columnHelper.accessor((row) => ({
    seriesName: row.seriesName,
    partNumber: row.partNumber,
  }), {
    id: "series",
    header: "Series",
    cell: (info) => {
      const { seriesName, partNumber } = info.getValue();
      return (
        <div className="text-xs leading-none text-orange truncate">
          {seriesName
            ? partNumber
              ? `${seriesName} • Part ${partNumber}`
              : seriesName
            : ""}
        </div>
      );
    },
    size: undefined, // flexible
  }),
  columnHelper.accessor("publishDate", {
    header: "Date",
    cell: (info) => (
      <time className="text-xs leading-none text-muted-foreground whitespace-nowrap">
        {info.getValue()}
      </time>
    ),
    size: 110,
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => (
      <div className="text-xs leading-none text-muted-foreground dark:text-white/80 whitespace-nowrap">
        {info.getValue()}
      </div>
    ),
    size: 90,
  }),
  columnHelper.accessor("readTime", {
    header: "Read",
    cell: (info) => (
      <div className="text-xs leading-none text-muted-foreground text-right whitespace-nowrap">
        {info.getValue()}m
      </div>
    ),
    size: 60,
  }),
];

export function PostListItem({ post }: PostListItemProps) {
  const table = useReactTable({
    data: [post],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="hover:bg-muted/40 transition-colors">
      <div className="grid items-center gap-2 px-1 py-0 h-6" style={{ gridTemplateColumns: '1fr 1fr 110px 90px 60px' }}>
        {table.getRowModel().rows[0]?.getVisibleCells().map((cell) => (
          <div key={cell.id} className="min-w-0 flex items-center h-6">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        ))}
      </div>
    </div>
  );
}
