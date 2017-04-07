import axios from "axios";
import '../../axiosConfig';

export default class ActivityApiService {
  list(){
    return new Promise(function (resolve, reject) {
      axios.get("/v1/activities?size=6&page=0").then(function (result) {
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
