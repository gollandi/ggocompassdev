export interface PortableTextChild {
  _type?: string;
  text?: string;
}

export interface PortableTextBlock {
  _key: string;
  _type?: string;
  children?: PortableTextChild[];
}

const extractTextFromBlock = (block: PortableTextBlock): string => {
  if (!block?.children?.length) return "";
  return block.children
    .map((child) => child.text || "")
    .join("")
    .trim();
};

export const portableTextToPlainText = (
  blocks?: PortableTextBlock[] | null,
  { joinWith = "\n\n" }: { joinWith?: string } = {}
): string => {
  if (!blocks?.length) return "";
  return blocks
    .filter((block) => block?._type === "block")
    .map(extractTextFromBlock)
    .filter(Boolean)
    .join(joinWith);
};

export const portableTextToParagraphs = (
  blocks?: PortableTextBlock[] | null
): string[] => {
  if (!blocks?.length) return [];
  return blocks
    .filter((block) => block?._type === "block")
    .map(extractTextFromBlock)
    .filter(Boolean);
};
