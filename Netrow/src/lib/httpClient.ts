import queryString from 'query-string';

const ADRESS = "http://localhost:2018/WebApi";

const company = {
    username: "FEUP",
    password: "qualquer1",
    company: "BELAFLOR",
    instance: "Default",
    grand_type: "password",
    line: "Professional",
}

let instance: HttpClient = null;

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
        this.getToken(onTokenError);
    }

    getToken(onTokenError: Function) {
        this.postUrlEncoded("token", company)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                onTokenError(error);
            });
    }

    postUrlEncoded(path: string, body: Object, headers: {[key: string]: string} = {}): Promise<Response> {
        const url = `${ADRESS}/token?${queryString.stringify(body)}`;
        const postHeaders = {
            ... headers,
            "Content-Type": urlEncoded,
        };
        const postBody = "";

        return fetch(url, {
            method: "POST",
            mode: "cors",
            headers: postHeaders,
            redirect: "follow",
            body: postBody,
        });
    }


}