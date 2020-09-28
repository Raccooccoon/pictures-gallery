import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate {
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> {
      return this.authentication.user$
        .pipe(
          take(1),
          map(user => !!user),
          tap(loggedIn => {
            if (!loggedIn) {
              this.router.navigate(['/']);
            }
          })
        );
    }
  }
