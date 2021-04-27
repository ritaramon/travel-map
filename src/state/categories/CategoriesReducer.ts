import { Action, Category } from "../../globalTypes";
import { constants } from "../constants";

export type CategoriesData = {
  categories: Category[];
};
const defaultCategoriesData: CategoriesData = {
  categories: [],
};

export const categoriesReducer = (
  state = defaultCategoriesData,
  action: Action
): CategoriesData => {
  switch (action.type) {
    case constants.categories.ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    case constants.categories.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case constants.categories.DELETE_CATEGORY: {
      const filteredCategories = state.categories.filter(
        (category) => category.id !== action.payload
      );
      return { ...state, categories: filteredCategories };
    }
    default:
      return state;
  }
};
