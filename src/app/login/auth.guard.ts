import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(private router: Router, private authService: AuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        if(!this.authService.isAuthenticated()){
            this.router.navigate(['/login']);
            localStorage.setItem('isLoggedIn',"false");
            localStorage.removeItem('id');
        }

        let url: string = state.url;
        console.log(url);
        return this.verifyLogin(url);
    }

    verifyLogin(url): boolean {
        if(!this.isLoggedIn()){
            this.router.navigate(['/login']);
            return false;
        }
        
        else if(this.isLoggedIn()) {
            return true;
        }
    }

    public isLoggedIn(): boolean {
        let status = false;
        if (localStorage.getItem('isLoggedIn') == "true") {
            status = true;
        }
        else {
            status = false;
        }
        return status;
    }
}