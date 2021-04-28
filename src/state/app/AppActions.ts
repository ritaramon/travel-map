import { Action } from "../../types";
import { constants } from "../constants";

const setLoading = (payload: boolean): Action => ({
  type: constants.app.SET_LOADING,
  payload,
});

const setUpdated = (payload: number): Action => ({
  type: constants.app.SET_UPDATED,
  payload,
});

const displayCategoryModal = (): Action => ({
  type: constants.app.DISPLAY_CATEGORY_MODAL,
});

const setSidebarVisibility = (
  payload: boolean | undefined = undefined
): Action => ({
  type: constants.app.SET_SIDEBAR_VISIBILITY,
  payload,
});

export const appActions = {
  setLoading,
  setUpdated,
  displayCategoryModal,
  setSidebarVisibility,
};
