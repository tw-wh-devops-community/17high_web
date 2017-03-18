import axios from "axios"

class AccountApiService {
  getLoginInfo(){
    var promise = new Promise(function(resolve, reject) {
      axios.get("/account").then(function(result){
        if(result.status != 200) {
          resolve([]);
          console.error("invalid error");
          console.error(result);
          return;
        }
        resolve(result.data);
      }).catch(function (e) {
        console.error("catch error");
        console.error(e);
        reject(e);
      })
    });
    return promise;

  }
}

export default AccountApiService
