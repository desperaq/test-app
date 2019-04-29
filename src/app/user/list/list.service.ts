import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { List } from './list';
import { map } from 'rxjs/operators';
import { Card } from '../card/card';

const API = environment.apiUrl;

@Injectable() 
export class ListService {
    apiUrl ='/list';

    constructor(private _http: HttpClient) {}

    getAll() {
        return this._http.get(API + this.apiUrl).pipe(
            map(res => <List[]>res)
        );
    }

    get(id: string) {
        return this._http.get(API + this.apiUrl + '/' + id).pipe(
          map(res => <List>res));
      }
    
      getCards(id: string) {
        return this._http.get(API + this.apiUrl + '/' + id + '/cards').pipe(
          map(res => <Card[]>res));
      }
    
      put(list: List) {
        return this._http
          .put(API + this.apiUrl + '/' + list._id, JSON.stringify(list))
          .toPromise();
      }
    
      post(list: List) {;
        return this._http.post(API + this.apiUrl, JSON.stringify(list)).pipe(
          map(res => <List>res));
      }
    
      delete(list: List) {
        return this._http.delete(API + this.apiUrl + '/' + list._id)
          .toPromise();
    
      }
}