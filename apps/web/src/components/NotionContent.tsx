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
              <ul key={`list-${block.id}`} className="list-disc pl-6 space-y-2">
                {currentList}
              </ul>
            ) : (
              <ol key={`list-${block.id}`} className="list-decimal pl-6 space-y-2">
                {currentList}
              </ol>
            ),
          );
          currentList = [];
        }
        currentListType = listType;
      }

      currentList.push(<NotionBlock key={block.id} block={block} />);
    } else {
      // Push any existing list to elements
      if (currentList.length > 0) {
        elements.push(
          currentListType === "bulleted" ? (
            <ul key={`list-${block.id}`} className="list-disc pl-6 space-y-2">
              {currentList}
            </ul>
          ) : (
            <ol key={`list-${block.id}`} className="list-decimal pl-6 space-y-2">
              {currentList}
            </ol>
          ),
        );
        currentList = [];
        currentListType = null;
      }

      elements.push(<NotionBlock key={block.id} block={block} />);
    }
  });

  // Push any remaining list
  if (currentList.length > 0) {
    elements.push(
      currentListType === "bulleted" ? (
        <ul key="list-final" className="list-disc pl-6 space-y-2">
          {currentList}
        </ul>
      ) : (
        <ol key="list-final" className="list-decimal pl-6 space-y-2">
          {currentList}
        </ol>
      ),
    );
  }

  return <div className="space-y-4">{elements}</div>;
}
