import { all } from "redux-saga/effects";
import { categoriesSaga } from "./categories/CategoriesSagas";
import { circlesSagas } from "./circles/CirclesSaga";

function* appSaga(): Generator {
  yield all([...circlesSagas, ...categoriesSaga]);
}

export default appSaga;
