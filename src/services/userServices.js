import {authHeader} from '../helpers/fakeBackend';

export const userServices = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  remove,
};

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if (response.status === 401) {
              logout();
              window.location.reload(true);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
}

function login(username, password) {
  const opts = {
    method: 'POST',
    header: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password}),
  };

  return fetch('/users/authenticate', opts)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  localStorage.removeItem('user');
}

function register(user) {
  const opts = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  };

  return fetch('/users/register', opts).then(handleResponse);
}

function getAll() {
  const opts = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch('/users', opts).then(handleResponse);
}

function getById(id) {
  const opts = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`/users/${id}`, opts).then(handleResponse);
}


function update(user) {
  const opts = {
    method: 'PUT',
    headers: {...authHeader, 'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  };

  return fetch(`/users/${user.id}`, opts).then(handleResponse);
}


function remove(id) {
  const opts = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(`/users/${id}`, opts).then(handleResponse);
}
