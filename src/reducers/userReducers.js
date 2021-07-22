import {userConstants} from '../actions/userActions';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {loggedIn: true, user} : {};

export function authentication(state= initialState, action) {
  switch(action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export function registration(state = {}, action) {
  switch(action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        registering: true,
      };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
}

export function users(state = {}, action) {
  switch(action.type) {
    case userConstants.GET_USERS_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GET_USERS_SUCCESS:
      return {
        items: action.users,
      };
    case userConstants.GET_USERS_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(user => 
          user.id === action.id ? {...user, deleting: true} : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      return {
        items: state.item.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            const {deleting, ...userCopy} = user;
            return {...userCopy, deleteError: action.error};
          }
          return user;
        })
      }
    default:
      return state;
  }
}

