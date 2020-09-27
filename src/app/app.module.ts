import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PictureUploadComponent } from './components/picture-upload/picture-upload.component';
import { PicturesListComponent } from './components/pictures-list/pictures-list.component';
import { PictureItemComponent } from './components/picture-item/picture-item.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PictureUploadComponent,
    PicturesListComponent,
    PictureItemComponent,
    MainComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
