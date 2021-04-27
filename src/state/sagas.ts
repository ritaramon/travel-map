import { all, call, put, takeEvery } from "redux-saga/effects";
import { actions } from "./actions";
import * as api from "../apis/mapDataApi";
import * as firebaseApi from "../apis/firebaseApi";
import firebase from "firebase/app";
import { auth } from "../config/firebaseConfig";
import { Action, Category } from "../globalTypes";
import { constants } from "./constants";

function* fetchMapData(): Generator {
  try {
    yield put(actions.app.setLoading(true));
    const elements: any = yield call(api.getBoardElements);
    yield put(actions.circles.setData(elements));
    const response: any = yield call(firebaseApi.getCategories);
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

function* watchFetchMapDataRequest() {
  yield takeEvery(constants.app.FETCH_MAP_DATA_REQUEST, fetchMapData);
}

function* addCircle(action: Action): Generator {
  try {
    yield put(actions.circles.updateDataByCoordinates({ ...action.payload }));
    const response: any = yield call(api.addBoardElement, action.payload);
    action.payload._id = response.id;
    yield put(actions.circles.setSelectedCircleId(response.id));
    // yield put(actions.sideb(true));
    yield put(actions.circles.updateDataByCoordinates({ ...action.payload }));
  } catch (error) {
    console.log(error);
  }
}

function* watchAddElement() {
  yield takeEvery(constants.circles.ADD_CIRCLE_REQUEST, addCircle);
}

function* deleteCircle(action: Action): Generator {
  try {
    yield call(api.deleteBoardElement, action.payload);
    yield put(actions.circles.deleteCircle(action.payload));
    yield put(actions.circles.setSelectedCircleId(""));
  } catch (error) {
    console.log(error);
  }
}

function* watchDeleteCircleRequest() {
  yield takeEvery(constants.circles.DELETE_CIRCLE_REQUEST, deleteCircle);
}

function* addCategory(action: Action): Generator {
  try {
    action.payload.userId = auth.currentUser?.uid;
    const response: any = yield call(firebaseApi.addCategory, action.payload);
    action.payload.id = response.id;
    yield put(actions.categories.addCategory(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* watchAddCategoryRequest() {
  yield takeEvery(constants.categories.ADD_CATEGORY_REQUEST, addCategory);
}

function* deleteCategory(action: Action): Generator {
  try {
    yield put(actions.app.setLoading(true));
    yield call(firebaseApi.deleteCategory, action.payload);
    yield put(actions.categories.deleteCategory(action.payload));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(actions.app.setLoading(false));
  }
}

function* watchDeleteCategoryRequest() {
  yield takeEvery(constants.categories.DELETE_CATEGORY_REQUEST, deleteCategory);
}

function* appSaga(): Generator {
  yield all([
    watchFetchMapDataRequest(),
    watchAddElement(),
    watchDeleteCircleRequest(),
    watchAddCategoryRequest(),
    watchDeleteCategoryRequest(),
  ]);
}

export default appSaga;
