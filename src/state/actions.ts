import { CellData } from "../globalTypes";
import {
  TOGGLE_SIDEBAR,
  UPDATE_DATA,
  SET_DATA,
  DELETE_CIRCLE,
  SET_SELECTED_CIRCLE_ID,
  FETCH_MAP_ELEMENTS,
} from "./constants";

export type Action = {
  type: string;
  payload?: any;
};

export const fetchMapElements = (): Action => ({
  type: FETCH_MAP_ELEMENTS,
});

export const toggleSidebar = (): Action => ({
  type: TOGGLE_SIDEBAR,
});

export const setSelectedCircleId = (payload: string): Action => ({
  type: SET_SELECTED_CIRCLE_ID,
  payload,
});

export const setData = (payload: CellData[]): Action => ({
  type: SET_DATA,
  payload,
});

export const updateData = (payload: CellData): Action => ({
  type: UPDATE_DATA,
  payload,
});

export const deleteCircle = (payload: string): Action => ({
  type: DELETE_CIRCLE,
  payload,
});
