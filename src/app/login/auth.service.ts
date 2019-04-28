import { JwtHelperService } from '@auth0/angular-jwt'
import { Injectable } from '@angular/core';

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {}

    public getId(): string {
        return localStorage.getItem('id');
    }

    public isAuthenticated():boolean {
        const id = this.getId();
        console.log(id);
        return id != undefined;
    }

    logout(): void{
        localStorage.setItem('isLoggedIn',"false");
    }
}