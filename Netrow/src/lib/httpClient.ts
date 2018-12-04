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

const TOKEN = "xlY7_qYCgDLoQz9WKidFpobQc8fSNZ33JAYAt2M8DXmRG_qf2HUYBA31pmN8DpPvrWVXJfKwTm1-1YNjisyGKK00rT1a4VvbsBm5DLxOgzSpPo5Ue95tfVBUuz8fdujpPmJBaKlE0-5wBOmb9uBf88CbxPmgeH0zDR7yA6g0_P3HoDC5PSQtoDtC7-05H4rEqGZ2XCb59LyjIAnKTcb2YMv57-md_48Vt5THeBtbPT3GM2tw7MgHlYduiFq50_bHtpWEejOpj08yWZ_6DacXuQ9kGYw2iRkwuZq-58tLBNeEW3hjYv4pI_4gXuf503DB";

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
            "CDU_Email",
            "CDU_Password"
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
              })});
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