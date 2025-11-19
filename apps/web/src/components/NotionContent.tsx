import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionBlock } from "./NotionBlock";

export function NotionContent({ blocks }: { blocks: BlockObjectResponse[] }) {
  let currentList: React.ReactNode[] = [];
  let currentListType: "bulleted" | "numbered" | null = null;
  const elements: React.ReactNode[] = [];

  const flushList = (key: string) => {
    if (currentList.length === 0 || !currentListType) {
      return;
    }

    const isBulleted = currentListType === "bulleted";

    elements.push(
      isBulleted ? (
        <ul className="list-disc space-y-2 pl-6" key={`list-${key}`}>
          {currentList}
        </ul>
      ) : (
        <ol className="list-decimal space-y-2 pl-6" key={`list-${key}`}>
          {currentList}
        </ol>
      )
    );

    currentList = [];
    currentListType = null;
  };

  for (const block of blocks) {
    const isListItem = block.type === "bulleted_list_item" || block.type === "numbered_list_item";

    if (isListItem) {
      const listType = block.type === "bulleted_list_item" ? "bulleted" : "numbered";

      if (currentListType && currentListType !== listType) {
        flushList(block.id);
      }

      if (!currentListType) {
        currentListType = listType;
      }

      currentList.push(<NotionBlock block={block} key={block.id} />);
      continue;
    }

    flushList(block.id);
    elements.push(<NotionBlock block={block} key={block.id} />);
  }

  flushList("final");

  return <div className="space-y-4">{elements}</div>;
}
