import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthServiceService);
  router = inject(Router);

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    }
    );
  }

  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem("access_token",res.data.token);
        localStorage.setItem("user_profile", JSON.stringify(res.data.user));
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['home']);
        this.loginForm.reset();

      },
      error:(err)=>{
        console.log(err);
        alert(err.error)
      }
    })
  }
}
