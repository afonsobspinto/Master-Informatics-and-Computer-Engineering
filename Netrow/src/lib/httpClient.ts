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

const TOKEN = "quJPZhOUgC1kwCf5vJmNtx2qHIldeE-q6IMl7vKkfSXWXEKoPb5WqAZX-aRS-GMBOzmCrQwQaB3UXoK3KDJJ_zrJNvk-aiWsz1hcT-VqZIsyxpu26uJ8LSlSxSvD7onNhMbRYi66lKKRKukaNOSBeN5IwcqE9IqgiGIeOxFRuSRd_FHiH-9Tuzhzihkwf1487Kj12nfDrQCZXM1anckYu72P-F3pwWTV3wiUvpHLPINCOss26vj8SkD0lgFS4RP12SDLMcwxL7oWsMCh-dZ6TgUnuCXl_VbOUZ77pPWQTEwb_Dh-XM-ANgyedY5JqQEc";

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