import { CellData } from "../globalTypes";
import {
  TOGGLE_SIDEBAR,
  UPDATE_DATA,
  SET_DATA,
  DELETE_CIRCLE,
  SET_SELECTED_CIRCLE_ID,
} from "./constants";

export type Action = {
  type: string;
  payload: any;
};

export const toggleSidebar = (): Action => {
  return {
    type: TOGGLE_SIDEBAR,
    payload: undefined,
  };
};

export const setSelectedCircleId = (payload: string): Action => {
  return {
    type: SET_SELECTED_CIRCLE_ID,
    payload,
  };
};

export const setData = (payload: CellData[]): Action => {
  return {
    type: SET_DATA,
    payload,
  };
};

export const updateData = (payload: CellData): Action => {
  return {
    type: UPDATE_DATA,
    payload,
  };
};

export const deleteCircle = (payload: string): Action => {
  return {
    type: DELETE_CIRCLE,
    payload,
  };
};