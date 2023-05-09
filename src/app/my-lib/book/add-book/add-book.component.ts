import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/interface/author';
import { Book } from 'src/app/interface/book';
import { Genre } from 'src/app/interface/genre';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';
import { GanreService } from 'src/app/service/ganre.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(private genreService:GanreService, private bookService:BookService, private authorService:AuthorService){}

  ngOnInit(){
    this.loadForm()
    this.loadGenre()
  }

  addBook:any
  author:Author= ({} as Author)
  genre:Genre[]= [];
  selected:string | undefined;

  getAuthor(author:Author){

  this.author = author
  }

  addNewBook(name:string, countPages:string){
    this.bookService.addNewBook(name, Number(countPages), Number(this.selected)).subscribe((res:Book)=> {
      console.log("книга добавлена")
      this.updBook.emit("Список  книг обновлен")
    })
  }

  loadGenre(){
    this.genreService.getGenre().subscribe((res:Genre[])=> {
      this.genre = res})
  }

  loadForm(){
    this.addBook= new FormGroup({
      name: new FormControl("", [Validators.required]),
      countpage:new FormControl("", [Validators.required, Validators.pattern("[0-9]{1,5}")]),
      genre: new FormControl("", [Validators.required]),
    })
  }
  @Output()
  updBook: EventEmitter<string> = new EventEmitter;


}
