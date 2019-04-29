import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private authService: AuthService, private loginService: LoginService) { }

  ngOnInit() {
    this.createForm();

  }

  createForm() {
    this.loginForm = this.fb.group({
       email: [''],
       password: [''],
    });
 }

  getFromRegistered() {
    let par: any = {};
    this.route.queryParams.subscribe(params => {
      par = params;
    })
    return par;
  }

  get f() {return this.loginForm.controls;}

  onSave() {
    this.loginService.login(this.f.email.value, this.f.password.value).subscribe(
      res => console.log(res)
    )
  }
}
