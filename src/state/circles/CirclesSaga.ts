import firebase from "firebase/app";
import { call, put, takeEvery } from "redux-saga/effects";
import * as categoriesApi from "../../apis/categoriesApi";
import * as circlesApi from "../../apis/circlesApi";
import { Action, Category, CircleElement } from "../../types";
import { actions } from "../actions";
import { constants } from "../constants";
import { InfoMessages } from "../../constants/other";
import { toast } from "react-toastify";

function* addCircle(action: Action): Generator {
  try {
    yield put(actions.circles.updateCircle({ ...action.payload }));
    const response = (yield call(
      circlesApi.addCircleElement,
      action.payload
    )) as { id: string };
    action.payload._id = response.id;
    yield put(actions.circles.updateCircle({ ...action.payload }));
    yield put(actions.circles.setSelectedCircleId(response.id));
    yield put(actions.app.setSidebarVisibility(true));
  } catch (error) {
    yield call(toast.error, InfoMessages.errorMessage);
  }
}

function* updateCircle(action: Action): Generator {
  try {
    yield call(circlesApi.addCircleElement, action.payload);
    yield put(actions.circles.updateCircle({ ...action.payload }));
    yield call(toast.success, InfoMessages.updateMessage);
  } catch (error) {
    yield call(toast.error, InfoMessages.errorMessage);
  }
}

function* deleteCircle(action: Action): Generator {
  try {
    yield call(circlesApi.deleteCircleElement, action.payload);
    yield put(actions.circles.deleteCircle(action.payload));
    yield put(actions.circles.setSelectedCircleId(""));
    yield put(actions.app.setSidebarVisibility(false));
  } catch (error) {
    yield call(toast.error, InfoMessages.errorMessage);
  }
}

function* fetchCirclesAndCategories(): Generator {
  try {
    yield put(actions.app.setLoading(true));
    const elements = (yield call(circlesApi.getCircles)) as CircleElement[];
    yield put(actions.circles.setCircles(elements));
    const response = (yield call(categoriesApi.getCategories)) as Category[];
    const categories: Category[] = [];
    response.forEach((doc: firebase.firestore.DocumentData) => {
      const category = doc.data();
      categories.push({
        id: doc.id,
        ...category,
      });
    });
    yield put(actions.categories.setCategories(categories));
  } catch (error) {
    yield call(toast.error, InfoMessages.errorMessage);
  } finally {
    yield put(actions.app.setLoading(false));
  }
}

export const circlesSagas = [
  takeEvery(constants.circles.ADD_CIRCLE_REQUEST, addCircle),
  takeEvery(constants.circles.UPDATE_CIRCLE_REQUEST, updateCircle),
  takeEvery(constants.circles.DELETE_CIRCLE_REQUEST, deleteCircle),
  takeEvery(
    constants.circles.FETCH_CIRCLES_AND_CATEGORIES,
    fetchCirclesAndCategories
  ),
];
