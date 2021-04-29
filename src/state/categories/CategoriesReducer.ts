import { Action, Category } from "../../types";
import { constants } from "../constants";

export type CategoriesData = {
  categories: Category[];
  loading: boolean;
};
const defaultCategoriesData: CategoriesData = {
  categories: [],
  loading: false,
};

export const categoriesReducer = (
  state = defaultCategoriesData,
  action: Action
): CategoriesData => {
  switch (action.type) {
    case constants.categories.ADD_CATEGORY:
      return { ...state, categories: [action.payload, ...state.categories] };
    case constants.categories.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case constants.categories.DELETE_CATEGORY: {
      const filteredCategories = state.categories.filter(
        (category) => category.id !== action.payload
      );
      return { ...state, categories: filteredCategories };
    }
    case constants.categories.SET_CATEGORIES_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
