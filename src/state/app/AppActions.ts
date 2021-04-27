import { Action } from "../../globalTypes";
import { constants } from "../constants";

const setLoading = (payload: boolean): Action => ({
  type: constants.app.SET_LOADING,
  payload,
});

const displayCategoryModal = (): Action => ({
  type: constants.app.DISPLAY_CATEGORY_MODAL,
});

const setSidebarVisibility = (): Action => ({
  type: constants.app.SET_SIDEBAR_VISIBILITY,
});

const fetchMapDataRequest = (): Action => ({
  type: constants.app.FETCH_MAP_DATA_REQUEST,
});

export const appActions = {
  setLoading,
  displayCategoryModal,
  setSidebarVisibility,
  fetchMapDataRequest,
};
