import {Types} from './types';

export const fetchWeather = (payload: {city: string, countryCode: string}) => {
  return {
    type: Types.FETCH_WEATHER,
    payload,
  };
};

export const updateWeather = (payload: any) => {
  return {
    type: Types.UPDATE_WEATHER,
    payload,
  };
};

export const setError = (error: string) => {
  return {
    type: Types.FETCH_DATA_FAILED,
    payload: error,
  };
};
