import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
   this.registerForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      role: ['', Validators.required],
   });
}

onSave() {
this.router.navigate(['/login'], {
  queryParams: {message: "registered"}
})
}

}
