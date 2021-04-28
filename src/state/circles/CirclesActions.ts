import { Action, CellData } from "../../types";
import { constants } from "../constants";

const addCircle = (payload: CellData): Action => ({
  type: constants.circles.ADD_CIRCLE_REQUEST,
  payload,
});

const setSelectedCircleId = (payload: string): Action => ({
  type: constants.circles.SET_SELECTED_CIRCLE_ID,
  payload,
});

const setCircles = (payload: CellData[]): Action => ({
  type: constants.circles.SET_CIRCLES,
  payload,
});

const updateCircle = (payload: CellData): Action => ({
  type: constants.circles.UPDATE_CIRCLE,
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

const updateCircleRequest = (payload: CellData): Action => ({
  type: constants.circles.UPDATE_CIRCLE_REQUEST,
  payload,
});

const fetchCirclesAndCategoriesRequest = (): Action => ({
  type: constants.circles.FETCH_CIRCLES_AND_CATEGORIES,
});

export const circlesActions = {
  addCircle,
  setSelectedCircleId,
  setCircles,
  updateCircle,
  deleteCircle,
  deleteCircleRequest,
  updateCircleRequest,
  fetchCirclesAndCategoriesRequest,
};
