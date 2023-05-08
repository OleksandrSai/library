import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book, CollectionBooks } from 'src/app/interface/book';
import { Genre } from 'src/app/interface/genre';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';
import { GanreService } from 'src/app/service/ganre.service';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.scss']
})
export class GenreEditComponent {

  constructor(private authorService:AuthorService, private bookService:BookService, private genreService:GanreService){
  }


  genreDetails:Genre = ({} as Genre)
  editGenreForm:any;
  authorEditBook:boolean = false;
  addAuthorBook:any
  selected:string = "2";
  genre:Genre[]=[];

//обновляем данные о книге
  nextGenreEdit(key:Genre){
    this.genreDetails = key;
    this.loadForm()
  }


//редактируем жанр
editBook(name:string){
  this.genreDetails.genre = name
  this.genreService.editGenre(this.genreDetails).subscribe((genre:Genre)=> this.updGenre.emit("Измененно название жанра"))
  }

//Создаем реактивную форму
  loadForm(){
    this.editGenreForm= new FormGroup({
      name: new FormControl(`${this.genreDetails.genre}`, [Validators.required])
    })
  }

  @Output()
  updGenre:EventEmitter<string> = new EventEmitter


}
