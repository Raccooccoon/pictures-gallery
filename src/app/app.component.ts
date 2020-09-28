import { Component } from '@angular/core';

import { tap } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

import { ManagePicturesService } from './services/manage-pictures.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private picturesService: ManagePicturesService,
    private spinner: NgxSpinnerService
  ) {
    this.picturesService.isSpinnerShown$.pipe(
      tap((val) => val ? this.spinner.show() : this.spinner.hide())
    ).subscribe();
  }
}
