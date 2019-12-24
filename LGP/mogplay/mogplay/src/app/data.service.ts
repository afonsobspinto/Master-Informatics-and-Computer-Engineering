/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { throwError as observableThrowError, Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType, RequestOptions, } from '@angular/http';
import { sha256 } from 'js-sha256';


import axios from 'axios'


export const ledgerApiActionUrl = 'http://localhost:3001/api/';
export const dbApiActionUrl = 'http://localhost:3000/';
export const authApiActionUrl = 'http://localhost:3001/auth/jwt/callback';

@Injectable()
export class DataService<Type> {
  private resolveSuffix = '?resolve=true';
  private headers: Headers;

  private static handleError(error: any): Observable<string> {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return observableThrowError(errMsg);
  }

  private static extractData(res: Response): any {
    return res.json();
  }

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getAll(ns: string): Observable<Type[]> {
    
    return this.http.get(`${ledgerApiActionUrl}${ns}`).pipe(
      map(DataService.extractData),
      catchError(DataService.handleError));
  }

  public getSingle(ns: string, id: string): Observable<Type> {
    

    return this.http.get(ledgerApiActionUrl + ns + '/' + id + this.resolveSuffix).pipe(
      map(DataService.extractData),
      catchError(DataService.handleError));
  }

  public addDb(asset: any) {
    

    const passHash = sha256(asset.password);
    asset.password = passHash
    asset.passwordConfirmation = passHash;

    return this.http.post(dbApiActionUrl + 'signup', asset, { withCredentials: true }).pipe(
      map(DataService.extractData),
      catchError(DataService.handleError));
  }

  public importCardString(ns: string, asset: string, cardName: string) {
    
    

    const formData = new FormData();

    const contentType = 'application/octet-stream';
    const sliceSize = 512;


    const byteCharacters = atob(asset);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }


    


    const blob = new Blob(byteArrays, { type: contentType });


    formData.append('card', blob);

    return this.http.post(ledgerApiActionUrl + ns + `?name=${cardName}`, formData,
      { withCredentials: true }).pipe(
        map(DataService.extractData),
        catchError(DataService.handleError));
  }


  public update(ns: string, id: string, itemToUpdate: Type): Observable<Type> {
    
    
    
    
    return this.http.put(`${ledgerApiActionUrl}${ns}/${id}`, itemToUpdate).pipe(
      map(DataService.extractData),
      catchError(DataService.handleError));
  }

  public auth(token: string) {
    
    

    const authJwtHeader = {
      headers: { 'authorization': 'Bearer ' + token },
      maxRedirects: 0,
      validateStatus: function (status) {
        return status >= 200 && status < 303;
      },
      withCredentials: true
    };

    return axios.get(authApiActionUrl, authJwtHeader);
  }


  public loginLedger(cardData: string): Promise<any> {
    
    return this.importCardString('wallet/import', cardData, 'myCard.card').toPromise()
  }


  public addPurchase(asset: any) {
    
    

    return this.http.post(ledgerApiActionUrl + 'purchase', asset, { withCredentials: true }).pipe(
      map(DataService.extractData),
      catchError(DataService.handleError)).toPromise();
  }

  public getTokens(asset: any) {
    
    

    const authJwtHeader = {
      headers: { 'authorization': 'Bearer ' + asset },
      withCredentials: true
    };

    return axios.get(dbApiActionUrl + 'api/users/tokens' , authJwtHeader);
  }

  public getVideo(asset: any) {
    
    

    return axios.get(ledgerApiActionUrl + 'video/' + asset  , {withCredentials: true});
  }

  public getUser(asset: any) {
    return axios.get(ledgerApiActionUrl + 'user/' + asset  , {withCredentials: true});
  }

}
