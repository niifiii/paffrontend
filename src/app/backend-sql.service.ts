import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendSqlService {

  constructor(private _http: HttpClient) { };

  async authenticate(userName:string, password:string) {
    
    //const params = new HttpParams();
    //params.append('userName',`${userName}`)
    //  .append('password', `${password}`);

    //const headers = new HttpHeaders();
    //headers.set('Content-Type', 'x-www-form-urlencoded');

    const headers = new HttpHeaders().set('Content-Type', 'x-www-form-urlencoded');
 
    const body = new HttpParams().set('userName', userName).set('password', password)

    //console.log('here: ', headers);

    return await this._http.post<any>('http://localhost:3000/api/authenticate', body.toString(), { headers })
      .toPromise()
      .then( result => {
        console.log('backendSqlService(): ', result)
        return result
      })
      .catch( error => {
        console.log(error)
      });
    } 


}
