import { Action, Category } from "../../types";
import { constants } from "../constants";

const setCategories = (payload: Category[]): Action => ({
  type: constants.categories.SET_CATEGORIES,
  payload,
});

const addCategory = (payload: Category): Action => ({
  type: constants.categories.ADD_CATEGORY,
  payload,
});

const addCategoryRequest = (payload: Category): Action => ({
  type: constants.categories.ADD_CATEGORY_REQUEST,
  payload,
});

const deleteCategory = (payload: string): Action => ({
  type: constants.categories.DELETE_CATEGORY,
  payload,
});

const deleteCategoryRequest = (payload: string): Action => ({
  type: constants.categories.DELETE_CATEGORY_REQUEST,
  payload,
});

const setCategoriesLoading = (payload: boolean): Action => ({
  type: constants.categories.SET_CATEGORIES_LOADING,
  payload,
});

export const categoriesActions = {
  setCategories,
  addCategory,
  addCategoryRequest,
  deleteCategory,
  deleteCategoryRequest,
  setCategoriesLoading,
};
