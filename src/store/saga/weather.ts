import {put, takeLatest, call} from 'redux-saga/effects';
import {Types} from '../action/weather/types';
import {updateWeather, setError} from '../action/weather';
import {fetchWeather} from '../../api/weatherApi';

function* fetchDATA(action) {
  try {
    console.log('called weather saga', action.payload);
    const {city, countryCode} = action.payload;
    const query = `${city},${countryCode}`;
    const result = yield call(fetchWeather, query);

    yield put(updateWeather(result.data));
  } catch (e: any) {
    yield put(setError(e.message));
  }
}

export function* listenFetchWeatherEvent() {
  yield takeLatest(Types.FETCH_WEATHER, fetchDATA);
}
