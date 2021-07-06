import {alertConstants} from '../actions/alertActions';

export function alert(state = {}, action) {
  switch(action.type) {
    case alertConstants.SUCCESS:
      return {
        type: alertConstants.SUCCESS,
        message: action.message,
      };
    case alertConstants.ERROR:
      return {
        type: alertConstants.ERROR,
        message:action.message,
      };
    case alertConstants.CLEAR:
      return {
        type: alertConstants.CLEAR,
      };
    default:
      return state;
  }
}