import { Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book, CollectionBooks } from 'src/app/interface/book';
import { Genre } from 'src/app/interface/genre';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';
import { GanreService } from 'src/app/service/ganre.service';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent{
  constructor(private authorService:AuthorService, private bookService:BookService, private genreService:GanreService){
  }


  bookDetails:Book = ({} as Book)
  editAuthorForm:any;
  authorEditBook:boolean = false;
  addAuthorBook:any
  selected:string = "2";
  genre:Genre[]=[];

//обновляем данные о книге
  nextEditBook(key:CollectionBooks){
    let bookId = key.id
    this.bookService.getOneBook(bookId).subscribe((book:Book)=> {this.bookDetails = book;
      this.selected = String(book.genreBook)
    this.loadForm()})
    this.genreService.getGenre().subscribe((genre:Genre[])=> this.genre = genre )
  }


//редактируем автора
editBook(name:string, countPages:string){
   this.bookDetails.countPages = Number(countPages);
   this.bookDetails.name = name;
   this.bookDetails.genreBook = Number(this.selected);
    this.bookService.editBook(this.bookDetails).subscribe((book:Book)=> this.updBook.emit("Книга изменена №" + this.bookDetails.id))
  }

//Создаем реактивную форму
  loadForm(){
    this.editAuthorForm= new FormGroup({
      name: new FormControl(`${this.bookDetails.name}`, [Validators.required]),
      countPage: new FormControl(`${this.bookDetails.countPages}`, [Validators.required]),

      // pass: new FormControl("", [Validators.required, Validators.minLength(6)]),
    })
  }

  @Output()
  updBook:EventEmitter<string> = new EventEmitter




}
