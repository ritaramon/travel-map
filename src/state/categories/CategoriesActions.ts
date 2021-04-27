import { Action, Category } from "../../globalTypes";
import { constants } from "../constants";

const setCategories = (payload: Category[]): Action => ({
  type: constants.categories.SET_CATEGORIES,
  payload,
});

const setCategoriesRequest = (): Action => ({
  type: constants.categories.SET_CATEGORIES_REQUEST,
});
// neaisku ar reik :)

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

export const categoriesActions = {
  setCategories,
  setCategoriesRequest,
  addCategory,
  addCategoryRequest,
  deleteCategory,
  deleteCategoryRequest,
};
