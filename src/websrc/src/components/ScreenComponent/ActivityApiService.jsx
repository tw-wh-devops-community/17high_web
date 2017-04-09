import axios from "axios";
import '../../axiosConfig';

export default class ActivityApiService {
  list(url){
    return new Promise(function (resolve, reject) {
      axios.get(url).then(function (result) {
        if (result.status != 200) {
          return;
        }
        resolve(result.data);
      }).catch(function (e) {
        reject(e);
      })
    });
  }
};
