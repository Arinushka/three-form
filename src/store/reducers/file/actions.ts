import { Element } from "../../../types";
import { ActionType, FILE_LOADED} from "./types";

export function loaded(data: Element[]): ActionType {
  return {
    type: FILE_LOADED,
    payload: {
      data
    }
  }
}
