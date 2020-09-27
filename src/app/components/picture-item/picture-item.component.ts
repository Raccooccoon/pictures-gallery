import { Component, Input } from '@angular/core';

import { ManagePicturesService } from 'src/app/services/manage-pictures.service';

@Component({
  selector: 'app-picture-item',
  templateUrl: './picture-item.component.html',
  styleUrls: ['./picture-item.component.css']
})
export class PictureItemComponent {

  @Input() pictureSrc: string;
  @Input() pictureCaption: string;
  @Input() pictureId: string;

  constructor(
    private picturesService: ManagePicturesService
  ) { }

  public deletePicture(id: string): void {
    this.picturesService.deletePictureDetails(id);
  }
}
