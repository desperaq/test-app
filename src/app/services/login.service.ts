import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = "/auth/login";
  
  constructor(private _http: HttpClient, private authService: AuthService, private router: Router) { }

  public login(email: string, password: string) {
    return this._http.post(API + this.apiUrl, {email: email, password: password})
  }
}
