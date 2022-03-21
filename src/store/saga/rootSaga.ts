import {all, fork} from 'redux-saga/effects';
import {listenFetchWeatherEvent} from './weather';

export default function* rootSaga() {
  yield all([
    fork(listenFetchWeatherEvent),
  ]);
}
