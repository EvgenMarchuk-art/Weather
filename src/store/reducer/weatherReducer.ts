import {Types} from '../action/weather/types';

const initialState = {data: {}};

const weatherReducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case Types.UPDATE_WEATHER:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
