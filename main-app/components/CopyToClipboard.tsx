import copy from "clipboard-copy";

export default async function handleCopyClick(text: string) {
  try {
    await copy(text);
    return true;
  } catch (error) {
    console.error("Failed to copy text to clipboard", error);
    return false;
  }
}
