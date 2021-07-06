import {userServices} from '../services/userServices';
import {alertActions} from './alertActions';
import {history} from '../helpers/history';

export const userConstants = {
  REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
  REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
  REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

  LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
  
  LOGOUT: 'USERS_LOGOUT',

  GETALL_REQUEST: 'USERS_GETALL_REQUEST',
  GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
  GETALL_FAILURE: 'USERS_GETALL_FAILURE',

  DELETE_REQUEST: 'USERS_DELETE_REQUEST',
  DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',
  DELETE_FAILURE: 'USERS_DELETE_FAILURE'    
};

export const userActions = {
  login,
  logout,
  register,
  getAll,
  remove,
};

function login(username, password, from) {
  return dispatch => {
    dispatch(request({username}));

    userServices.login(username, password)
      .then(user => {
        dispatch(success(user));
        history.push(from);
      })
      .catch(err => {
        dispatch(failure(err.toString()));
        dispatch(alertActions.error(err.toString()));
      });
  };

  function request(user) { return {type: userConstants.LOGIN_REQUEST, user} }
  function success(user) { return {type: userConstants.LOGIN_SUCCESS, user} }
  function failure(error) { return {type: userConstants.LOGIN_FAILURE, error} }
}

function logout() {
  userServices.logout();
  return {type: userConstants.LOGOUT};
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userServices.register(user)
      .then(user => {
          dispatch(success());
          history.push('/login');
          dispatch(alertActions.success('Registeration successful'));
      })
      .catch(err => {
        dispatch(failure(err.toString()));
        dispatch(alertActions.error(err.toString()));
      });
  };

  function request(user) { return {type: userConstants.REGISTER_REQUEST, user} }
  function success(user) { return {type: userConstants.REGISTER_SUCCESS, user} }
  function failure(error) { return {type: userConstants.REGISTER_FAILURE, error} }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userServices.getAll()
      .then(users => {
        dispatch(success(users));
      })
      .catch(err => {
        dispatch(failure(err.toString()));
      });
  };

  function request() { return {type: userConstants.GETALL_REQUEST} }
  function success(users) { return {type: userConstants.GETALL_SUCCESS, users} }
  function failure(error) { return {type: userConstants.GETALL_FAILURE, error} }
}

function remove(id) {
  return dispatch => {
    dispatch(request(id));

    userServices.remove(id)
      .then(user => {
        dispatch(success(id));
      })
      .catch(err => {
        dispatch(failure(id, err.toString()));
      });
  }

  function request(id) { return {type: userConstants.DELETE_REQUEST, id} }
  function success(id) { return {type: userConstants.DELETE_SUCCESS, id} }
  function failure(id, error) { return {type: userConstants.DELETE_FAILURE, id, error} }
}
