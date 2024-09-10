import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  http: HttpClient = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  

  constructor() { }

  // signup(email:string,name:string,phoneNumber:string,password:string){

  //   const data = {
  //     email:email,
  //     name:name,
  //     phoneNumber:phoneNumber,
  //     password:password
  //   }

  //   return this.http.post<any>('http://localhost:8080/api/auth/register',data)

  // }
  registerService(registerObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }
  isLoggedIn(){
    return !!localStorage.getItem("access_token");
  }


  getLoggedInUser(){
    const userString = localStorage.getItem('user_profile');
    const user = userString ? JSON.parse(userString) : null;
    return user;
  }
  
  isAdmin(){
    const userString = localStorage.getItem('user_profile');
    const user = userString ? JSON.parse(userString) : null;

    if(user?.role === "ADMIN"){
      return true;
    }else{
      return false;
    }
  }

}
