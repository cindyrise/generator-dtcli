import assign from 'object-assign';
import { homeType } from './actionType';
const initialState = {
  homeData: []
};
export const homeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case homeType.GET_HOME_DATA:
      return Object.assign({}, state, {
        homeData: payload,
      });
      case homeType.GET_USER_DATA:
      return Object.assign({}, state, {
        userData: payload,
      });
      case homeType.GET_NAV_DATA:
      return Object.assign({}, state, {
        navData: payload,
      });
    default:
      return state;
  }
};
