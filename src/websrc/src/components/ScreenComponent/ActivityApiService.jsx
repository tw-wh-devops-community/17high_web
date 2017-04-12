import axios from 'axios';
import '../../axiosConfig';

export default class ActivityApiService {
  static list(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then((result) => {
        if (result.status !== 200) {
          resolve([]);
          console.error('invalid error');
          console.error(result);
          return;
        }
        resolve(result.data);
      }).catch(e =>
        reject(e)
      );
    });
  }
}
