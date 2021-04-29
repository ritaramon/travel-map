import { Action } from "../../types";
import { constants } from "../constants";

export type AppData = {
  isSidebarVisible: boolean;
  loading: boolean;
  isCategoryModalVisible: boolean;
};

const defaultAppData: AppData = {
  isSidebarVisible: false,
  loading: true,
  isCategoryModalVisible: false,
};

export const appReducer = (state = defaultAppData, action: Action): AppData => {
  switch (action.type) {
    case constants.app.SET_LOADING:
      return { ...state, loading: action.payload };
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
