import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseCssCode: React.FC = () => {
  return (
    <Code
      codeString={useCssCodeString}
      fileName="useCss.ts"
      id={HooksType.UseCss}
    />
  );
};

export default UseCssCode;

const useCssCodeString = `import { useEffect } from "react";
import { create, NanoRenderer } from "nano-css";
import { addon as addonCSSOM, CSSOMAddon } from "nano-css/addon/cssom";
import { addon as addonVCSSOM, VCSSOMAddon } from "nano-css/addon/vcssom";
import { cssToTree } from "nano-css/addon/vcssom/cssToTree";
import { useCreation } from "ahooks";

type NoneType = NanoRenderer & CSSOMAddon & VCSSOMAddon;
const nano = create() as NoneType;
addonCSSOM(nano);
addonVCSSOM(nano);

type CSSKey = keyof React.CSSProperties;

type CSSProps =
  | React.CSSProperties
  | {
      [key: Exclude<string, CSSKey>]: CSSProps;
    };

let counter = 0;
const useCss = (css: CSSProps): string => {
  const className = useCreation(
    () => "domesy-hooks-css-" + (counter++).toString(36),
    []
  );
  const sheet = useCreation(() => new nano.VSheet(), []);

  useEffect(() => {
    const tree = {};
    cssToTree(tree, css, "." + className, "");
    sheet.diff(tree);

    return () => {
      sheet.diff({});
    };
  }, []);

  return className;
};

export default useCss;`;
