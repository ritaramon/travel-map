import { call, put, takeEvery } from "redux-saga/effects";
import { actions } from "../actions";
import * as categoriesApi from "../../apis/categoriesApi";
import { auth } from "../../config/firebaseConfig";
import { Action } from "../../types";
import { constants } from "../constants";

function* addCategory(action: Action): Generator {
  try {
    action.payload.userId = auth.currentUser?.uid;
    const response: any = yield call(categoriesApi.addCategory, action.payload);
    action.payload.id = response.id;
    yield put(actions.categories.addCategory(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* deleteCategory(action: Action): Generator {
  try {
    yield put(actions.app.setLoading(true));
    yield call(categoriesApi.deleteCategory, action.payload);
    yield put(actions.categories.deleteCategory(action.payload));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(actions.app.setLoading(false));
  }
}

export const categoriesSaga = [
  takeEvery(constants.categories.DELETE_CATEGORY_REQUEST, deleteCategory),
  takeEvery(constants.categories.ADD_CATEGORY_REQUEST, addCategory),
];
