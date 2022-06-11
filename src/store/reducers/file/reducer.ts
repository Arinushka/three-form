import { Reducer } from "redux";
import { ActionType, IFileState, FILE_LOADED } from "./types";

const initialState: IFileState = {
  data: []
}

const file: Reducer<IFileState, ActionType> = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FILE_LOADED:
      return { ...state, data: action.payload.data }
    default:
      return state;
  }
}

export default file;