import { all, call, put, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as api from "../apis/mapDataApi";
import * as firebaseApi from "../apis/firebaseApi";
import firebase from "firebase/app";
import {
  ADD_CATEGORY_REQUEST,
  ADD_CIRCLE_REQUEST,
  DELETE_CIRCLE_REQUEST,
  FETCH_MAP_ELEMENTS,
} from "./constants";
import { auth } from "../config/firebaseConfig";

function* fetchElements(): Generator {
  try {
    const elements: any = yield call(api.getBoardElements, [0, 0, 180, 90]);
    yield put(actions.setData(elements));
  } catch (error) {
    console.log(error);
  }
}

function* watchFetchMapElements() {
  yield takeEvery(FETCH_MAP_ELEMENTS, fetchElements);
}

function* addElement(action: any): Generator {
  try {
    yield put(
      actions.updateDataByCoordinates({ ...action.payload, pending: true })
    );
    const response: any = yield call(api.addBoardElement, action.payload);
    action.payload._id = response.id;
    yield put(actions.setSelectedCircleId(response.id));
    yield put(
      actions.updateDataByCoordinates({ ...action.payload, pending: false })
    );
  } catch (error) {
    console.log(error);
  }
}

function* watchAddElement() {
  yield takeEvery(ADD_CIRCLE_REQUEST, addElement);
}

function* deleteCircle(action: any): Generator {
  try {
    yield call(api.deleteBoardElement, action.payload);
    yield put(actions.deleteCircle(action.payload));
    yield put(actions.setSelectedCircleId(""));
  } catch (error) {
    console.log(error);
  }
}

function* watchDeleteCircleRequest() {
  yield takeEvery(DELETE_CIRCLE_REQUEST, deleteCircle);
}

function* addCategory(action: any): Generator {
  try {
    action.payload.userId = auth.currentUser?.uid;
    const response: any = yield call(firebaseApi.addCategory, action.payload);
    action.payload.id = response.id;
    yield put(actions.addCategory(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* watchAddCategoryRequest() {
  yield takeEvery(ADD_CATEGORY_REQUEST, addCategory);
}

function* appSaga(): Generator {
  yield all([
    watchFetchMapElements(),
    watchAddElement(),
    watchDeleteCircleRequest(),
    watchAddCategoryRequest(),
  ]);
}

export default appSaga;
