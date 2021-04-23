import {
  TOGGLE_SIDEBAR,
  UPDATE_DATA,
  SET_DATA,
  DELETE_CIRCLE,
  SET_SELECTED_CIRCLE_ID,
  FETCH_MAP_ELEMENTS,
} from "./constants";
import { Action } from "./actions";
import { combineReducers } from "redux";
import { CellData } from "../globalTypes";

type AppData = {
  isSidebarVisible: boolean;
  selectedCircleId: string;
};

type ApiData = {
  data: CellData[];
};

export type AppState = {
  appData: AppData;
  apiData: ApiData;
};

const defaultAppData: AppData = {
  isSidebarVisible: true,
  selectedCircleId: "",
};

const defaultApiData: ApiData = {
  data: [],
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
    case UPDATE_DATA: {
      const filteredCircles = state.data.filter(
        (x) => x._id !== action.payload._id
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

export const combinedReducer = combineReducers({
  appData: appData,
  apiData: apiData,
});
