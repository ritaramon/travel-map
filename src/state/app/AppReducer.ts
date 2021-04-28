import { Action } from "../../types";
import { constants } from "../constants";

export type AppData = {
  isSidebarVisible: boolean;
  loading: boolean;
  updated: number;
  isCategoryModalVisible: boolean;
};

const defaultAppData: AppData = {
  isSidebarVisible: false,
  loading: false,
  updated: 0,
  isCategoryModalVisible: false,
};

export const appReducer = (state = defaultAppData, action: Action): AppData => {
  switch (action.type) {
    case constants.app.SET_LOADING:
      return { ...state, loading: action.payload };
    case constants.app.SET_UPDATED:
      return { ...state, updated: action.payload + state.updated };
    case constants.app.SET_SIDEBAR_VISIBILITY: {
      return {
        ...state,
        isSidebarVisible: action.payload ?? !state.isSidebarVisible,
      };
    }
    case constants.app.DISPLAY_CATEGORY_MODAL:
      return {
        ...state,
        isCategoryModalVisible: !state.isCategoryModalVisible,
      };
    default:
      return state;
  }
};
