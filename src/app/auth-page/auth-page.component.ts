import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestsService } from '../all.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  authForm!: UntypedFormGroup
  isLoading = false

  constructor(private request: RequestsService, private router: Router) {}

  ngOnInit() {
    this.authForm = new UntypedFormGroup({
      login: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required)
    })

    if(localStorage.getItem('access_token')) {
      this.router.navigate(['/accounts'])
    }
  }

  logIn() {
    const authFormData = {...this.authForm.value}
    this.isLoading = true
    this.request.authRequest(authFormData.login, authFormData.password).subscribe( (response: any) => {
      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('refresh_token', response.refresh_token)
      this.isLoading = false
      this.router.navigate(['/accounts'])
    }, error => {
      this.isLoading = false
      alert(error.message)
    })
  }

}
