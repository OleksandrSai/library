import { Component, ViewChild } from '@angular/core';
import { Author } from 'src/app/interface/author';
import { Book, CollectionBooks } from 'src/app/interface/book';
import { Genre } from 'src/app/interface/genre';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';
import { GanreService } from 'src/app/service/ganre.service';
import { EditBookComponent } from '../book/edit-book/edit-book.component';
import { GenreAddComponent } from './genre-add/genre-add.component';
import { GenreEditComponent } from './genre-edit/genre-edit.component';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent {

  constructor(private bookService:BookService, private authorService:AuthorService, private genreService:GanreService){}



AllGenre:Genre[] = [];
AllAuthors:Author[]=[];
addGenre:boolean = false;
infoGenre:boolean = false;
editGenre:boolean = false;
editBook:CollectionBooks = ({}  as CollectionBooks)

windowAdd(){
  this.addGenre = true;
  this.infoGenre = false;
  this.editGenre = false;
}
windowDetails(){
  this.addGenre = false;
  this.infoGenre = true;
  this.editGenre = false
}
windowEdit(){
  this.addGenre = false;
  this.infoGenre = false;
  this.editGenre = true
}

@ViewChild(GenreEditComponent) edit:GenreEditComponent | undefined;

myUpdateGenre(event:any){
console.log(event)
this.reload()
}

reload(){
  this.genreService.getAllInfoGenre().subscribe((genre:Genre[])=> this.AllGenre = genre)
}

ngOnInit(){
  this.reload()

}


authorDetails(id:number){
  this.windowDetails()
  this.authorService.deltailAuthor(id)
}

bookEdit(key:Genre){
  this.windowEdit()
  setTimeout(() => {
    this.edit?.nextGenreEdit(key)
  }, 0);

}

// удаляем книгу, берем всех авторов, обновляем список кинг
bookdelete(id:number){
  this.genreService.deleteGenre(id).subscribe((genre:Genre)=>{
    console.log("Жанр удален")
    this.reload()})

}


}
