import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseCookiesCode: React.FC = () => {
  return (
    <Code
      codeString={useCookiesCodeString}
      fileName="useCookies.ts"
      id={HooksType.UseCookies}
    />
  );
};

export default UseCookiesCode;

const useCookiesCodeString = `import { useCallback, useState } from "react";
import Cookies from "js-cookie";

type useCookiesReturnType = [
  string | null,
  (newValue: string, options?: Cookies.CookieAttributes) => void,
  () => void
];
const useCookies = (cookieName: string): useCookiesReturnType => {
  const [value, setValue] = useState<string | null>(
    () => Cookies.get(cookieName) || null
  );

  const updateCookies = useCallback(
    (newValue: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(cookieName, newValue, options);
      setValue(newValue);
    },
    [cookieName]
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(cookieName);
    setValue(null);
  }, [cookieName]);

  return [value, updateCookies, deleteCookie];
};

export default useCookies;`;
