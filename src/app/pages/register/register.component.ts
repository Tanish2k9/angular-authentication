import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent implements OnInit {
  fb = inject(FormBuilder)
  authService:AuthServiceService = inject(AuthServiceService);
  router = inject(Router)
  registerForm !: FormGroup;


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    }
    );
  }
  
  register(){
    this.authService.registerService(this.registerForm.value)
    .subscribe({
      next:(res)=>{
        alert("User Created!");
        this.registerForm.reset();
        this.router.navigate(['login'])
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

}
