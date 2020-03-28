import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://api.nomics.com/v1/currencies/sparkline?key=d5c0b39dde218cb8ee40a4304daac684',
});

export default api;
