import { createContext } from "react";
import { SelectGroupConnextType } from "./interface";

const GroupContext = createContext<SelectGroupConnextType | null>(null);

export default GroupContext;
