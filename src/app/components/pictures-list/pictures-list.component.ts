import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators';

import { ManagePicturesService } from 'src/app/services/manage-pictures.service';
import { IPictureData } from 'src/app/models/picture-data.model';

@Component({
  selector: 'app-pictures-list',
  templateUrl: './pictures-list.component.html',
  styleUrls: ['./pictures-list.component.css']
})
export class PicturesListComponent implements OnInit {

  public picturesList: IPictureData[];

  constructor(
    private picturesService: ManagePicturesService,
  ) { }

  ngOnInit(): void {
    this.picturesService.pictureDetailsList.snapshotChanges().pipe(
      tap((list) => {
        this.picturesList = list.map((pic) => pic.payload.val());
        this.picturesService.isSpinnerShown$.next(false);
      })
    ).subscribe();
  }
}
