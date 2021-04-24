import { CellData } from "../globalTypes";
import {
  TOGGLE_SIDEBAR,
  UPDATE_DATA_BY_ID,
  SET_DATA,
  DELETE_CIRCLE,
  SET_SELECTED_CIRCLE_ID,
  FETCH_MAP_ELEMENTS,
  ADD_CIRCLE_REQUEST,
  UPDATE_DATA_BY_COORDINATES,
  DELETE_CIRCLE_REQUEST,
} from "./constants";

export type Action = {
  type: string;
  payload?: any;
};

export const fetchMapElements = (): Action => ({
  type: FETCH_MAP_ELEMENTS,
});

export const addCircle = (payload: CellData): Action => ({
  type: ADD_CIRCLE_REQUEST,
  payload,
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

export const updateDataById = (payload: CellData): Action => ({
  type: UPDATE_DATA_BY_ID,
  payload,
});

export const updateDataByCoordinates = (payload: CellData): Action => ({
  type: UPDATE_DATA_BY_COORDINATES,
  payload,
});

export const deleteCircle = (payload: string): Action => ({
  type: DELETE_CIRCLE,
  payload,
});

export const deleteCircleRequest = (payload: string): Action => ({
  type: DELETE_CIRCLE_REQUEST,
  payload,
});
