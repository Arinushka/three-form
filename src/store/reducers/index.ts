import { combineReducers } from "redux";
import { Element } from "../../types";

import file from "./file/reducer";

export interface AppState {
  file: { data: Element[] };
}

const allReducers = combineReducers({
  file
})

export default allReducers;