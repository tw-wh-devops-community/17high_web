import axios from 'axios';
import '../../axiosConfig';

export default class ActivityApiService {
  static list(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then((result) => {
        if (result.status !== 200) {
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

  static submitData(url, requestData, onSuccess) {
    return new Promise((resolve, reject) => {
      console.log('submit data', requestData);
      const config = {
        xhrFields: { withCredentials: true },
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      axios.post(url, requestData, config).then((result) => {
        if (result.status !== 200) {
          console.error('invalid error');
          console.error(result);
          return;
        }
        onSuccess(result.data);
      }).catch(e =>
        reject(e)
      );
    });
  }

  static deleteActivity(id, onSuccess) {
    return new Promise((resolve, reject) => {
      axios.delete(`/v1/activities?id=${id}`).then((result) => {
        if (result.status !== 200) {
          resolve([]);
          return;
        }
        onSuccess && onSuccess();
      }).catch(e =>
        reject(e)
      );
    });
  }

  static selectActivity(id, onSuccess) {
    return new Promise((resolve, reject) => {
      axios.get(`/v1/activities/${id}`).then((result) => {
        if (result.status !== 200) {
          return onSuccess({});
        }
        onSuccess(result.data);
      }).catch(e => reject(e)
      );
    });
  }

  static updateActivity(url, requestData, onSuccess) {
    return new Promise((resolve, reject) => {
      const config = {
        xhrFields: { withCredentials: true },
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      axios.put(url, requestData, config).then((result) => {
        if (result.status !== 200) {
          console.error('invalid error');
          console.error(result);
          return;
        }
        onSuccess(result.data);
      }).catch(e =>
        reject(e)
      );
    });
  }

}
