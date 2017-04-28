import axios from 'axios';
import config from './env';

export default (() => {
  axios.defaults.baseURL = config.BASE_API_URL;
})();
