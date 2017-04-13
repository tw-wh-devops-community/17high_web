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

  static submitData(requestData, onSuccess) {
    return new Promise((resolve, reject) => {
      axios(requestData).then((result) => {
        if (result.status !== 200) {
          resolve([]);
          console.error('invalid error');
          console.error(result);
          return;
        }
        resolve(result.data);
        onSuccess(data);
      }).catch(e =>
        reject(e)
      );
    });
  }
}
