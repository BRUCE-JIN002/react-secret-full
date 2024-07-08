import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseCopyToClipboardCode: React.FC = () => {
  return (
    <Code
      codeString={useCopyToClipboardCodeString}
      fileName="useCopyToClipboard.ts"
      id={HooksType.UseCopyToClipboard}
    />
  );
};

export default UseCopyToClipboardCode;

const useCopyToClipboardCodeString = `import { useCallback, useRef } from "react";

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

type useCopyToClipboardType = () => [CopiedValue, CopyFn];

export const useCopyToClipboard: useCopyToClipboardType = () => {
  const copiedTextRef = useRef<string | null>(null);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      copiedTextRef.current = text;
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      copiedTextRef.current = null;

      return false;
    }
  }, []);

  return [copiedTextRef.current, copy];
};`;
