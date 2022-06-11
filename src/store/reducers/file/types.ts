import { Element } from "../../../types";

export const FILE_LOADED = 'FILE_LOADED';
export const FILE_EDIT = 'FILE_EDIT';

interface ILoaded {
  type: typeof FILE_LOADED;
  payload: {
    data: Element[];
  };
}

export interface IFileState {
  data: Element[];
};

export type ActionType =
  | ILoaded