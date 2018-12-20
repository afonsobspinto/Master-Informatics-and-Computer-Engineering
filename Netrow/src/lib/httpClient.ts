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

        const SQLquery = "Select Distinct Tbl1.Artigo as Artigo, Tbl1.Descricao as Descricao, Tbl1.DescricaoComercial as DescricaoComercial, ArtigoMoeda.PVP1 as Price, Tbl1.Stock as Stock, Tbl1.Familia as Familia, Tbl1.SubFamilia as SubFamilia, Tbl1.Image as Image From ( (Select Distinct Tbl.Artigo as Artigo, Tbl.Descricao as Descricao, ArtigoIdioma.DescricaoComercial as DescricaoComercial, Tbl.Stock as Stock, Tbl.Familia as Familia, Tbl.SubFamilia as SubFamilia, Tbl.Image as Image From ( (Select Artigo.Artigo as Artigo, Artigo.Descricao as Descricao, INV_Custeio.Quantidade as Stock, Artigo.Familia as Familia, Artigo.SubFamilia as SubFamilia, Artigo.CDU_CampoVar1 as Image from (Artigo Left JOIN INV_Custeio on Artigo.Artigo = INV_Custeio.Artigo)) as Tbl JOIN ArtigoIdioma on Tbl.Artigo = ArtigoIdioma.Artigo)) as Tbl1 JOIN ArtigoMoeda on Tbl1.Artigo = ArtigoMoeda.Artigo)"
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
    }*/

    public getOrderHistory(number) {
        //const path = `/Compras/Docs/Edita/000/ECF/A/`+number;
        const path = `/Vendas/Docs/Edita/000/FA/A/`+number;

        return new Promise<Object>((resolve, reject) => {
          this.getJson(path)
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
