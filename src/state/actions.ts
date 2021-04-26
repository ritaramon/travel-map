import { Category, CellData } from "../globalTypes";
import {
  TOGGLE_SIDEBAR,
  UPDATE_DATA_BY_ID,
  SET_DATA,
  DELETE_CIRCLE,
  SET_SELECTED_CIRCLE_ID,
  ADD_CIRCLE_REQUEST,
  UPDATE_DATA_BY_COORDINATES,
  DELETE_CIRCLE_REQUEST,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY,
  SET_CATEGORIES_REQUEST,
  SET_CATEGORIES,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY,
  FETCH_MAP_DATA_REQUEST,
  SET_LOADING,
  DISPLAY_CATEGORY_MODAL,
} from "./constants";

export type Action = {
  type: string;
  payload?: any;
};

export const fetchMapDataRequest = (): Action => ({
  type: FETCH_MAP_DATA_REQUEST,
});

export const setCategoriesRequest = (): Action => ({
  type: SET_CATEGORIES_REQUEST,
});

export const addCircle = (payload: CellData): Action => ({
  type: ADD_CIRCLE_REQUEST,
  payload,
});

export const toggleSidebar = (): Action => ({
  type: TOGGLE_SIDEBAR,
});

export const displayCategoryModal = (): Action => ({
  type: DISPLAY_CATEGORY_MODAL,
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

export const addCategoryRequest = (payload: Category): Action => ({
  type: ADD_CATEGORY_REQUEST,
  payload,
});

export const addCategory = (payload: Category): Action => ({
  type: ADD_CATEGORY,
  payload,
});

export const setCategories = (payload: Category[]): Action => ({
  type: SET_CATEGORIES,
  payload,
});

export const deleteCategoryRequest = (payload: string): Action => ({
  type: DELETE_CATEGORY_REQUEST,
  payload,
});

export const deleteCategory = (payload: string): Action => ({
  type: DELETE_CATEGORY,
  payload,
});

export const setLoading = (payload: boolean): Action => ({
  type: SET_LOADING,
  payload,
});
