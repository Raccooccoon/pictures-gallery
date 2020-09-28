import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { v4 as uuid } from 'uuid';

import { IPictureData } from '../models/picture-data.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ManagePicturesService {

  public pictureData: IPictureData = {
    caption: null,
    url: null,
    id: null
  };
  public selectedPicture: HTMLInputElement = null;
  public isSpinnerShown$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public pictureDetailsList: AngularFireList<any>;

  constructor(
    private storage: AngularFireStorage,
    private database: AngularFireDatabase,
    public authService: AuthenticationService
  ) {}

  public selectPicture(event: any): void {
    if (event.target.files[0]) {
      this.selectedPicture = event.target.files[0];
    }
  }

  public uploadPicture(data: IPictureData): void {
    if (!this.selectedPicture) {
      alert('Please choose image to upload');
      return;
    }
    const filePath = `${this.selectedPicture.name}_${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    this.isSpinnerShown$.next(true);
    this.storage
      .upload(filePath, this.selectedPicture)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            data.url = url;
            data.caption = `${this.selectedPicture.name.split('.').slice(0, -1).join('')}`;
            data.id = uuid();
            this.savePictureDetails(data);
            this.resetPictureData();
          });
        })
      ).subscribe();
  }

  public initPictureDetailsList(): void {
    this.isSpinnerShown$.next(true);
    this.pictureDetailsList = this.database.list(`${this.authService.userId}/pictureDetails`);
  }

  public deletePictureDetails(pictureId: string): void {
    const db = this.database.database.ref();
    const query = this.database.database.ref(`${this.authService.userId}/pictureDetails`).orderByKey();
    query.once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();
        if (value.id === pictureId) {
          db.child(`${this.authService.userId}/pictureDetails/${key}`).remove();
        }
      });
    });
  }

  private savePictureDetails(pictureDetails: IPictureData): void {
    this.pictureDetailsList.push(pictureDetails);
  }

  private resetPictureData(): void {
    this.pictureData.caption = null;
    this.pictureData.url = null;
    this.pictureData.id = null;
    this.selectedPicture = null;
  }
}
