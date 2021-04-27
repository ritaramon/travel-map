import { combineReducers } from "redux";
import { AppData, appReducer } from "./app/AppReducer";
import {
  CategoriesData,
  categoriesReducer,
} from "./categories/CategoriesReducer";
import { CirclesData, circlesReducer } from "./circles/CirclesReducer";

export type AppState = {
  appData: AppData;
  circlesData: CirclesData;
  categoriesData: CategoriesData;
};

export const combinedReducer = combineReducers({
  appData: appReducer,
  circlesData: circlesReducer,
  categoriesData: categoriesReducer,
});
