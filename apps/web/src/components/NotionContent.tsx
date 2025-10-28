import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionBlock } from "./NotionBlock";

export function NotionContent({ blocks }: { blocks: BlockObjectResponse[] }) {
  let currentList: React.ReactNode[] = [];
  let currentListType: "bulleted" | "numbered" | null = null;
  const elements: React.ReactNode[] = [];

  blocks.forEach((block) => {
    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const listType = block.type === "bulleted_list_item" ? "bulleted" : "numbered";

      // If we're starting a new list or switching list types
      if (currentListType !== listType) {
        // Push any existing list to elements
        if (currentList.length > 0) {
          elements.push(
            currentListType === "bulleted" ? (
              <ul className="list-disc space-y-2 pl-6" key={`list-${block.id}`}>
                {currentList}
              </ul>
            ) : (
              <ol className="list-decimal space-y-2 pl-6" key={`list-${block.id}`}>
                {currentList}
              </ol>
            )
          );
          currentList = [];
        }
        currentListType = listType;
      }

      currentList.push(<NotionBlock block={block} key={block.id} />);
    } else {
      // Push any existing list to elements
      if (currentList.length > 0) {
        elements.push(
          currentListType === "bulleted" ? (
            <ul className="list-disc space-y-2 pl-6" key={`list-${block.id}`}>
              {currentList}
            </ul>
          ) : (
            <ol className="list-decimal space-y-2 pl-6" key={`list-${block.id}`}>
              {currentList}
            </ol>
          )
        );
        currentList = [];
        currentListType = null;
      }

      elements.push(<NotionBlock block={block} key={block.id} />);
    }
  });

  // Push any remaining list
  if (currentList.length > 0) {
    elements.push(
      currentListType === "bulleted" ? (
        <ul className="list-disc space-y-2 pl-6" key="list-final">
          {currentList}
        </ul>
      ) : (
        <ol className="list-decimal space-y-2 pl-6" key="list-final">
          {currentList}
        </ol>
      )
    );
  }

  return <div className="space-y-4">{elements}</div>;
}
