import { all, call, put, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as api from "../apis/mapDataApi";
import { FETCH_MAP_ELEMENTS } from "./constants";

function* fetchElements(): Generator {
  try {
    const elements: any = yield call(api.getElements, [0, 0, 180, 90]);
    yield put(actions.setData(elements));
  } catch (error) {
    console.log(error);
  }
}

function* watchFetchMapElements() {
  yield takeEvery(FETCH_MAP_ELEMENTS, fetchElements);
}

function* appSaga(): Generator {
  yield all([watchFetchMapElements()]);
}

export default appSaga;
