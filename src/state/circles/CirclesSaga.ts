import { all, call, put, takeEvery } from "redux-saga/effects";
import { actions } from "../actions";
import * as circlesApi from "../../apis/circlesApi";
import * as categoriesApi from "../../apis/categoriesApi";
import { constants } from "../constants";
import { Action } from "../../types";
import firebase from "firebase/app";
import { Category } from "../../types";

function* addCircle(action: Action): Generator {
  try {
    yield put(actions.circles.updateCircle({ ...action.payload }));
    const response: any = yield call(
      circlesApi.addCircleElement,
      action.payload
    );
    action.payload._id = response.id;
    yield put(actions.circles.updateCircle({ ...action.payload }));
    yield put(actions.circles.setSelectedCircleId(response.id));
    yield put(actions.app.setSidebarVisibility(true));
  } catch (error) {
    console.log(error);
  }
}

function* updateCircle(action: Action): Generator {
  try {
    yield call(circlesApi.addCircleElement, action.payload);
    yield put(actions.circles.updateCircle({ ...action.payload }));
  } catch (error) {
    console.log(error);
  }
}

function* deleteCircle(action: Action): Generator {
  try {
    yield call(circlesApi.deleteCircleElement, action.payload);
    yield put(actions.circles.deleteCircle(action.payload));
    yield put(actions.circles.setSelectedCircleId(""));
    yield put(actions.app.setSidebarVisibility(false));
  } catch (error) {
    console.log(error);
  }
}

function* fetchCirclesAndCategories(): Generator {
  try {
    yield put(actions.app.setLoading(true));
    const elements: any = yield call(circlesApi.getCircles);
    yield put(actions.circles.setCircles(elements));
    const response: any = yield call(categoriesApi.getCategories);
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
    console.log(error);
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
