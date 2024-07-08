import { FC } from "react";
import { HooksType } from "../menu/Menu";
import UseCookiesCode from "../hooks/useCookies/UseCookiesCode";
import UseCopyToClipboardCode from "../hooks/useCopyToclipboard/UseCopyToclipboardCode";
import { MenuKey } from "../App";

interface Iprops {
  currentPage?: MenuKey;
}

const CustomHooks: FC<Iprops> = (props) => {
  const { currentPage } = props;

  return (
    <>
      {currentPage === HooksType.UseCookies && <UseCookiesCode />}
      {currentPage === HooksType.UseCopyToClipboard && (
        <UseCopyToClipboardCode />
      )}
    </>
  );
};

export default CustomHooks;
