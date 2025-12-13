import React from "react";
import NotePreview from "../../common/components/NotePreview";
import { readmeContent } from "./readme-content";

const UseScrollingDoc: React.FC = () => {
  return <NotePreview>{readmeContent}</NotePreview>;
};

export default UseScrollingDoc;
