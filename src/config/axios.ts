import axios from 'axios';
import history from './history';

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com',
  headers: {
    't-app-id': 'fndDfAdKqdjUJpEjtHLErKFk',
    't-app-secret': 'Bz9Rzzu2uh4HPE7xv8qftLVe'
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

instance.interceptors.response.use(function (response) {
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token']);
  }
  return response;
}, function (error) {
  if (error.response.status === 401 && error.response !== '') {
    history.push('/login');
    // window.location.href = '/login'
  } else {
    window.alert('请输入正确的用户名密码，未注册请先注册');
  }
});

export default instance;