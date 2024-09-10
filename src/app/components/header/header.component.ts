import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authService:AuthServiceService = inject(AuthServiceService);
  isLoggedIn: boolean = false;
  userName:string = "User";

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.userName = this.authService.getLoggedInUser().name;
    });
  }


  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_profile");
    this.authService.isLoggedIn$.next(false);
  }
}
