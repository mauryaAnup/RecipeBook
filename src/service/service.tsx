import axios from "axios";

const Service = {
    GET: function(url: string, token: string) {
        const promise = new Promise((resolve, reject) => {
            try {
                axios.get(url).
                then((res) => {
                    if (res.status === 200) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                }).catch((error) => {
                    resolve(error);
                })
            } catch (error) {
                reject(error);
            }
        })
        return promise;
    }
}

export default Service;