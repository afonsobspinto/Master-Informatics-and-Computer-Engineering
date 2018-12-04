import queryString from 'query-string';

const ADRESS = "http://localhost:2018/WebApi";

const company = {
    username: "FEUP",
    password: "qualquer1",
    company: "BELAFLOR",
    instance: "Default",
    grant_type: "password",
    line: "Professional",
}

let instance: HttpClient | null = null;

const jsonValue = "application/json";
const urlEncoded = "application/x-www-form-urlencoded";

const TOKEN = "XeKafqSfSX6b60EQjJXOViFyibn6TAkHrIQ_ztGTxUZymC78ks5hx7PlKG6dLMtZYJh3Q-KmuFaW9z_W-YUwy52WqWenAMG-5lAWrM2F9sNz6E7-9-R3SCZFlbctJTpkpJ2QLZB-66f9oSv2LGzh7xnrEPX0R4RK_KrQekx_AP8KeXyqsurPOutG2Kfyu7g1WZajjwd1_ZbtbXEWDyh1VTiMLxvz5r8WvQi8kdBSpTewB1LHnmnGqBLHib_rR2hZc8pauRhh1-mQGtWTubxqM9LpksZTUIEQ_eFTJcJuGfGJv08X6FJUaMzIL_zmU03g";

export class HttpClient {
    private token: string;

    static instance(onTokenError: Function) {
        if (instance == null) {
            instance = new HttpClient(onTokenError);
        }

        return instance;
    }

    private constructor(onTokenError: Function) {
        // TODO fix
        // this.getToken(onTokenError);
        this.token = TOKEN;
    }

    public postJson(path: string, body: Object) {
        const url = `${ADRESS}/${path}`;

        return new Promise<Object>((resolve, reject) => fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Accept': jsonValue,
                'Content-Type': jsonValue
            },
            redirect: "follow",
            body: JSON.stringify(body)
            }).then(data => {
                data.json().then(obj => {
                    resolve(obj);
                });
            })
            .catch(error => {
                reject(error);
            }));
    }

    getToken(onTokenError: Function) {
        let url = `${ADRESS}/token?${queryString.stringify(company)}`;
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': urlEncoded,
                'Accept': jsonValue,
            }
        }).then(data => {
            console.log(data);
            data.json().then(o => console.log(o));
        })
            .catch(error => {
                console.log(error);
            });
    }


}