import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { auth } from 'firebase/app';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user$: Observable<User>;
  public userName: string;
  public userPhoto: string;
  public userId: string;
  public isAuthorized = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userName = user.displayName;
          this.userPhoto = user.photoURL;
          this.userId = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.router.navigate(['main']);
  }

  public async googleSignIn(): Promise<boolean> {
    const provider: auth.GoogleAuthProvider = new auth.GoogleAuthProvider();
    const credentials: auth.UserCredential = await this.afAuth.signInWithPopup(provider);
    this.updateUserData(credentials.user);
    return this.router.navigate(['main']);
  }

  public async googleSignOut(): Promise<boolean> {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData({
    uid,
    email,
    displayName,
    photoURL
  }: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${uid}`
    );
    const userData: User = { uid, email, displayName, photoURL };
    this.userName = userData.displayName;
    this.userPhoto = userData.photoURL;
    return userRef.set(userData, { merge: true });
  }
}
