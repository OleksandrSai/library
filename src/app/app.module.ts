import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BackendServiceService } from './backend-service/backend-service.service';
import { HttpClientModule } from '@angular/common/http';

import { MyLibModule } from './my-lib/my-lib.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MyLibModule,
     BrowserAnimationsModule,
     InMemoryWebApiModule.forRoot(BackendServiceService, {delay:80}),
     HttpClientModule,
     FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
