import { Action, CellData } from "../../globalTypes";
import { constants } from "../constants";

const addCircle = (payload: CellData): Action => ({
  type: constants.circles.ADD_CIRCLE_REQUEST,
  payload,
});

const setSelectedCircleId = (payload: string): Action => ({
  type: constants.circles.SET_SELECTED_CIRCLE_ID,
  payload,
});

const setData = (payload: CellData[]): Action => ({
  type: constants.circles.SET_DATA,
  payload,
});

const updateDataById = (payload: CellData): Action => ({
  type: constants.circles.UPDATE_DATA_BY_ID,
  payload,
});

const updateDataByCoordinates = (payload: CellData): Action => ({
  type: constants.circles.UPDATE_DATA_BY_COORDINATES,
  payload,
});

const deleteCircle = (payload: string): Action => ({
  type: constants.circles.DELETE_CIRCLE,
  payload,
});

const deleteCircleRequest = (payload: string): Action => ({
  type: constants.circles.DELETE_CIRCLE_REQUEST,
  payload,
});

export const circlesActions = {
  addCircle,
  setSelectedCircleId,
  setData,
  updateDataById,
  updateDataByCoordinates,
  deleteCircle,
  deleteCircleRequest,
};
