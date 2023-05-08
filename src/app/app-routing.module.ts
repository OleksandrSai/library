import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './my-lib/author/author.component';
import { BookComponent } from './my-lib/book/book.component';
import { GenreComponent } from './my-lib/genre/genre.component';



export const routes: Routes = [

  {path:"", component:AuthorComponent},
  {path:"books", component:BookComponent},
  {path:"genre", component:GenreComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
