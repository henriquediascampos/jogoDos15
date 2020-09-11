import { createContext } from "react";
import BoardClass from "./board";
const BoardContext = createContext(new BoardClass(4));

export default BoardContext;