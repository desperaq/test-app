import {Injectable} from '@angular/core';
import {Card} from '../card/card';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const API = environment.apiUrl;

@Injectable()
export class CardService {
  apiUrl = '/card';

  constructor(private _http: HttpClient) {
  }

  getAll() {
    return this._http.get(API + this.apiUrl)
      .pipe(map(res => res));
  }

  get(id: string) {
    return this._http.get(API + this.apiUrl + '/' + id)
      .pipe(map(res => res));
  }

  put(card: Card) {
    return this._http.put(API + this.apiUrl + '/' + card._id, JSON.stringify(card))
      .toPromise();
  }

  post(card: Card) {
    return this._http.post(API + this.apiUrl, JSON.stringify(card))
      .pipe(map(res => <Card>res));
  }

  delete(card: Card) {
    return this._http.delete(API + this.apiUrl + '/' + card._id)
      .toPromise();
  }

}