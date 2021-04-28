import { call, put, takeEvery } from "redux-saga/effects";
import { auth } from "../../config/firebaseConfig";
import firebase from "firebase/app";
import * as categoriesApi from "../../apis/categoriesApi";
import { Action } from "../../types";
import { actions } from "../actions";
import { constants } from "../constants";
import { InfoMessages } from "../../constants/other";
import { toast } from "react-toastify";

function* addCategory(action: Action): Generator {
  try {
    yield put(actions.app.setLoading(true));
    action.payload.userId = auth.currentUser?.uid;
    const response = (yield call(
      categoriesApi.addCategory,
      action.payload
    )) as firebase.firestore.DocumentData;
    action.payload.id = response.id;
    yield put(actions.categories.addCategory(action.payload));
  } catch (error) {
    yield call(toast.error, InfoMessages.errorMessage);
  } finally {
    yield put(actions.app.setLoading(false));
  }
}

function* deleteCategory(action: Action): Generator {
  try {
    yield put(actions.app.setLoading(true));
    yield call(categoriesApi.deleteCategory, action.payload);
    yield put(actions.categories.deleteCategory(action.payload));
  } catch (error) {
    yield call(toast.error, InfoMessages.errorMessage);
  } finally {
    yield put(actions.app.setLoading(false));
  }
}

export const categoriesSaga = [
  takeEvery(constants.categories.DELETE_CATEGORY_REQUEST, deleteCategory),
  takeEvery(constants.categories.ADD_CATEGORY_REQUEST, addCategory),
];
