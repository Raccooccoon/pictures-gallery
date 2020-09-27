import { Component } from '@angular/core';

import { ManagePicturesService } from 'src/app/services/manage-pictures.service';
import { IPictureData } from 'src/app/models/picture-data.model';

@Component({
  selector: 'app-picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.css']
})
export class PictureUploadComponent {
  public pictureData: IPictureData = this.picturesService.pictureData;

  constructor(
    public picturesService: ManagePicturesService
  ) {}

  public selectPicture(event: Event): void {
    this.picturesService.selectPicture(event);
  }

  public uploadPicture(data: IPictureData): void {
    this.picturesService.uploadPicture(data);
  }
}
