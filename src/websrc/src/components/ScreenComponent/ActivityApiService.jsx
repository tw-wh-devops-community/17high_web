import axios from 'axios';
import '../../axiosConfig';

export default class ActivityApiService {
  static list(url) {
    return new Promise(function (resolve, reject) {
      axios.get(url).then(function (result) {
        if (result.status != 200) {
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
