import {
  TOGGLE_SIDEBAR,
  UPDATE_DATA_BY_ID,
  SET_DATA,
  DELETE_CIRCLE,
  SET_SELECTED_CIRCLE_ID,
  UPDATE_DATA_BY_COORDINATES,
  ADD_CATEGORY,
} from "./constants";
import { Action } from "./actions";
import { combineReducers } from "redux";
import { Category, CellData } from "../globalTypes";
import { categoriesCollection } from "../config/firebaseConfig";

type AppData = {
  isSidebarVisible: boolean;
  selectedCircleId: string;
};

type ApiData = {
  data: CellData[];
};

type CategoriesData = {
  categories: Category[];
};

export type AppState = {
  appData: AppData;
  apiData: ApiData;
  categoriesData: CategoriesData;
};

const defaultAppData: AppData = {
  isSidebarVisible: true,
  selectedCircleId: "",
};

const defaultApiData: ApiData = {
  data: [],
};

const defaultCategoriesData: CategoriesData = {
  categories: [],
};

const appData = (state = defaultAppData, action: Action): AppData => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, isSidebarVisible: !state.isSidebarVisible };
    case SET_SELECTED_CIRCLE_ID:
      return { ...state, selectedCircleId: action.payload };
    default:
      return state;
  }
};

const apiData = (state = defaultApiData, action: Action): ApiData => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    case UPDATE_DATA_BY_ID: {
      const filteredCircles = state.data.filter(
        (x) => x._id !== action.payload._id
      );
      return { ...state, data: [...filteredCircles, action.payload] };
    }
    case UPDATE_DATA_BY_COORDINATES: {
      const filteredCircles = state.data.filter(
        (element) =>
          element.x !== action.payload.x && element.y !== action.payload.x
      );
      return { ...state, data: [...filteredCircles, action.payload] };
    }
    case DELETE_CIRCLE: {
      const filteredCircles = state.data.filter(
        (x) => x._id !== action.payload
      );
      return { ...state, data: filteredCircles };
    }
    default:
      return state;
  }
};

const categoriesData = (
  state = defaultCategoriesData,
  action: Action
): CategoriesData => {
  switch (action.type) {
    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    default:
      return state;
  }
};

export const combinedReducer = combineReducers({
  appData: appData,
  apiData: apiData,
  categoriesData: categoriesData,
});
