import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorComponent } from './author/author.component';
import { NewAuthorComponent } from './author/new-author/new-author.component';
import { InitialsPipe } from '../pipe/initials.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DetaisAuthorComponent } from './author/detais-author/detais-author.component';

import { EditAuthorComponent } from './author/edit-author/edit-author.component';
import {MatInputModule} from '@angular/material/input';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BackendServiceService } from '../backend-service/backend-service.service';
import { BookComponent } from './book/book.component';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { AddNewBookComponent } from './author/edit-author/add-new-book/add-new-book.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { EditBookComponent } from './book/edit-book/edit-book.component';
import { GenreComponent } from './genre/genre.component';
import { GenreAddComponent } from './genre/genre-add/genre-add.component';
import { GenreEditComponent } from './genre/genre-edit/genre-edit.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { SerchComponent } from './book/serch/serch.component';




@NgModule({
  declarations: [
    AuthorComponent,
    NewAuthorComponent,
    InitialsPipe,
    DetaisAuthorComponent,
    EditAuthorComponent,
    BookComponent,
    AddNewBookComponent,
    AddBookComponent,
    EditBookComponent,
    GenreComponent,
    GenreAddComponent,
    GenreEditComponent,
    BookDetailsComponent,
    SerchComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    InMemoryWebApiModule.forRoot(BackendServiceService, { delay: 80 }),
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule


  ],
  exports: [AuthorComponent],
  providers:[ ]
})
export class MyLibModule {}
