import { Component } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  public userName: string = this.authService.userName;
  public userPhoto: string = this.authService.userPhoto;

  constructor(
    private authService: AuthenticationService
  ) { }

  public signOut(): void {
    this.authService.googleSignOut();
  }
}
