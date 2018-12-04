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


const jsonValue = "application/json";
const urlEncoded = "application/x-www-form-urlencoded";

const TOKEN = "4SZFT7DjCO1L11mgp_P5sgAXwty65OyzEAxuS2WzOe__ddTyPc_PzIru3h8fnRje0V8QVz_RzJts2H0Q8nbMRvyovySJiIm2w-KuGplG-7pjhLhjoXWPTljFVH-cTUUivbSG4JyP-Rhl6MBih8Yx83QSsE-_IOXDUd0IqroqqfzY-hS9HeJPOnAK2j1M5uTZtnj3c2K1Q3DcKUaOMWJLQydFA1I1hvWGhsoI162I5g7MpuPimOb0vtWpjiz0AIcy_HMewexS1SuXuD9Ziqkf3Qcqcaj8BqpnSSD5BYiT15MYNtdIqX8rIECRfp9wUcrb";

let instance: HttpClient | null = null;

export class HttpClient {
    private token: string;

    static instance(onTokenError: Function = console.error) {
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

    public getProfile(username: string) {
        const attributes = [
            "Nome",
            "Descricao",
            "Telefone",
            "Morada",
            "Localidade",
            "CodigoPostal",
            "Pais",
            "NumContribuinte",
            "CDU_CampoVar1",
            "CDU_CampoVar2"
        ]

        const path = `Base/Clientes/DaValorAtributos/${username}`;
        return new Promise<Object>((resolve, reject) => {
            this.postJson(path, attributes)
                .then(retObj => {
                    if (retObj === null || !Array.isArray(retObj)) {
                        reject(retObj);
                        return;
                    }

                    const profile = retObj.reduce((map, attrib) => {
                        map[attrib.Nome] = attrib.Valor;
                        return map;
                    }, {});

                    resolve(profile);
                }).catch(e => {
                    reject(e);
                })
        });
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
            let sendPromise = (obj1, obj2 = obj1) => {
                if (this.isStatusValid(data.status)) {
                    resolve(obj1);
                } else {
                    reject(obj2);
                }
            }
            data.json()
            .then(obj => sendPromise(obj))
            .catch(e => sendPromise(null, e));
        })
        .catch(error => {
            reject(error);
        }));
    }

    private isStatusValid(status: number) {
        const family = Math.floor(status / 100);
        return family == 2;
    }

    private getToken(onTokenError: Function) {
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