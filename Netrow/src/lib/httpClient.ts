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

let instance: HttpClient | null = null;

let onSuccessCallbacks: Function[] = [];

export class HttpClient {
    private token: string;

    static instance(onTokenError: Function = console.error, onSuccess = (instance) => {}) {
        if (instance == null) {
            onSuccessCallbacks.push(onSuccess);
            instance = new HttpClient(onTokenError);
        } else {
            if (instance.token === null) {
                onSuccessCallbacks.push(onSuccess);
            } else {
                onSuccess(instance);
            }
        }

    

        return instance;
    }

    private constructor(onTokenError: Function) {
        this.token = null;
        this.getToken(onTokenError);
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

    public getProducts() {
        const path = `Base/Artigos/LstArtigos`;
        return new Promise<Object>((resolve, reject) => {
            this.getJson(path)
                .then(retObj => {
                    if (retObj === null ) {
                        reject(retObj);
                        return;
                    }
                    resolve(retObj);
                })
                .catch(e =>
                {
                    reject(e);
                })
        });
    }

    public getProduct(product: string) {
        const path = `Base/Artigos/Edita/${product}`;
        return new Promise<Object>((resolve, reject) => {
            this.getJson(path)
                .then(retObj => {
                    if (retObj === null ) {
                        reject(retObj);
                        return;
                    }

                    resolve(retObj);
                })
                .catch(e =>
                {
                    reject(e);
                })
        });
    }

    public getCategories() {
        const SQLquery =
          "Select Familias.Familia, Familias.Descricao, SubFamilia, SubFamilias.Descricao as SubDescricao from ( Familias JOIN SubFamilias on SubFamilias.Familia = Familias.Familia)";
    
        const path = `Administrador/Consulta`;
        return new Promise<Object>((resolve, reject) => {
          this.postJson(path, SQLquery)
            .then(retObj => {
              if (retObj === null) {
                reject(retObj);
                return;
              }
              resolve(retObj);
            })
            .catch(e => {
              reject(e);
            });
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

    public getJson(path: string) {
        const url = `${ADRESS}/${path}`;

        return new Promise<Object>((resolve, reject) => fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Accept': jsonValue,
                'Content-Type': jsonValue
            },
            redirect: "follow",
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
        let url = `${ADRESS}/token`;
        const httpInstance = this;

        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': urlEncoded,
                'Accept': jsonValue,
            },
            body: queryString.stringify(company),
        }).then(data => data.json()
            .then(o => {
                this.token = o.access_token;

                if (onSuccessCallbacks.length != 0) {
                    onSuccessCallbacks.forEach(func => func(httpInstance));
                    onSuccessCallbacks = [];
                }

            }).catch(error => {
                    onTokenError(error);
        })).catch(error => {
            onTokenError(error);
        });
    }

}