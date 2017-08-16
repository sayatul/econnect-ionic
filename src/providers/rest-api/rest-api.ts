import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class RestApiProvider {

  constructor(public http: Http) {
  }

  getData(apiUrl: string) {
      return  this.http.get(apiUrl)
              .map((res : Response ) => res.json());

  }

  postData(apiUrl: string, body: Object) {
    var headers = new Headers()
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
 
      //let headers = new Headers({'Content-Type': 'application/json'});
      return  this.http.post(apiUrl, JSON.stringify(body), options)
                .map((res : Response ) => res.json());
  }

  putData(apiUrl: string, body: Object) {
    var headers = new Headers()
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
 
      //let headers = new Headers({'Content-Type': 'application/json'});
      return  this.http.put(apiUrl, JSON.stringify(body), options)
                .map((res : Response ) => res.json());
  }


}
