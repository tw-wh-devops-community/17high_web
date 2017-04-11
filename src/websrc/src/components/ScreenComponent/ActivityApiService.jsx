import axios from 'axios';
import '../../axiosConfig';

export default class ActivityApiService {
  static list() {
    return new Promise((resolve, reject) => {
      axios.get('/v1/activities?size=6&page=0').then((result) => {
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
