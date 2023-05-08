import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

import { FooterComponent } from './footer/footer.component';
import { MyLibModule } from '../my-lib/my-lib.module';
import {MatButtonModule} from '@angular/material/button';
import { PageRoutingModule } from './page-routing.module';



@NgModule({
  declarations: [
    HeaderComponent,

    FooterComponent
  ],
  imports: [
    CommonModule,
    MyLibModule,
    MatButtonModule,
    PageRoutingModule
  ],
  exports:[HeaderComponent,

    FooterComponent]
})
export class LayoutModule { }
