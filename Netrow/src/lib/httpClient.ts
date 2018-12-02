import queryString from 'query-string';
import axios from 'axios';

const ADRESS = "http://localhost:2018/WebApi";

const company = {
    username: "FEUP",
    password: "qualquer1",
    company: "BELAFLOR",
    instance: "Default",
    grant_type: "password",
    line: "Professional",
}

let  instance: HttpClient | null  = null;

const jsonValue = "application/json";
const urlEncoded = "application/x-www-form-urlencoded";

export class HttpClient {

    static instance(onTokenError: Function) {
        if (instance == null) {
            instance = new HttpClient(onTokenError);
        }

        return instance;
    }

    private constructor(onTokenError: Function) {
        // this.getToken(onTokenError);

        let url = `${ADRESS}/Base/Clientes/Existe/C8`;
        const token = "Jbz32PxnqHlOXN3AHULvfJLed5OVWcIUfqb4yexEqCailQv4bt6xKaJmdVtc9Az3ud3QjvTQJx5nBMi0qU9wSNSuLQVzG_w1aNYw0V_C7IPpAUCj6zt_LeLePj34NbSaeGcFwi_hvc_ycUmWHx9ExJG--2eRklxmMUb5Wsg9mxGgwb5i3GKWBahiZZ3a9r9JAsnTSQkiHbeNuiqhguAk9N8ee-KPiTnCDTTkwHLJR0BeyixE6rc1ox2RkoRKgHHteln5Cxq8bhXK3zK-pzsGMCJ_ZIThCPfGgp4uidCF4ypXWmjczIlUoyUPLxu9zrZM";
        axios.post(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': jsonValue
            }
        }).then(data => {
                
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });

    }

    getToken(onTokenError: Function) {
        this.postUrlEncoded("token", company)
            .then(data => {
                
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    postUrlEncoded(path: string, body: Object) {
        let url = `${ADRESS}/${path}?${queryString.stringify(company)}`;
        console.log(url);
        return axios.post(url, body, {
            headers: {
                'Content-Type': urlEncoded,
                // 'Accept': jsonValue
            }
        });

        // return fetch(url, {
        //     method: "POST",
        //     // mode: "cors",
        //     // headers: postHeaders,
        //     redirect: "follow",
        //     body: new URLSearchParams(queryString.stringify(body)),
        // });
    }


}