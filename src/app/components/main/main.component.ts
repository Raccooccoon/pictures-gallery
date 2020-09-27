import { Component, OnInit } from '@angular/core';

import { ManagePicturesService } from 'src/app/services/manage-pictures.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private picturesService: ManagePicturesService
  ) { }

  ngOnInit(): void {
    this.picturesService.initPictureDetailsList();
  }
}
