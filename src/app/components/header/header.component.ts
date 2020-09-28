import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public user$: Observable<User> = this.authService.user$;

  constructor(
    private authService: AuthenticationService
  ) { }

  public signIn(): void {
    this.authService.googleSignIn();
  }
}
