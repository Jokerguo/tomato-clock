import axios from 'axios';
import history from './history';

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com',
  headers: {
    't-app-id': 'sqqudwQ2z1Uo1wvCNhT42d5x',
    't-app-secret': 'MuXs7b9K4XC58rzEAttQ1fJ3'
  }
});

instance.interceptors.request.use(function (config) {
  const xToken = localStorage.getItem('x-token');
  if (xToken) {
    config.headers['Authorization'] = `Bearer ${xToken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  function (response) {
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token']);
  }
  return response;
},
  function (error) {
  if (error.response.status === 401 && error.response !== '') {
    history.push('/login');
    // window.location.href = '/login'
  } else if (error.response.status === 422) {
    window.alert('请求失败');
  }
});

export default instance;