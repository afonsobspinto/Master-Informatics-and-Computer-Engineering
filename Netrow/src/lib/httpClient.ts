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

const TOKEN = "Qo-UuBso2NYDn8QMTDKO0EO5cQZfFxGOjzekHRgIsYOUbOjqHWuuqZO9tAurkb3CqEWTbBltr4qNKqoEGDugKo-FdRl8duadcFYfOTlVAi8E61MCoUDIJDoj2EMjnocOfFTolXp1zjqVDkKdAmIH7Qdk3PukY6vWyTH9ji5etsNkMmjHpEopruBmItpQqyolUAhEzLW80s-cEFRi0C-OOE8eRa2xN42_57LfYJ3BukdVU8knccZeSnMfOTpJ2Xx3YvedKNtH3S75nUI4QTKdV4y6-T3-9lh5CjNkVZvalhSnW6nvzp6BfF2ef-Dl5U3a";

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