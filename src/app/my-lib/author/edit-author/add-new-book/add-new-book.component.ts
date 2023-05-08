import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Author } from 'src/app/interface/author';
import { Book } from 'src/app/interface/book';
import { Genre } from 'src/app/interface/genre';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';
import { GanreService } from 'src/app/service/ganre.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.scss']
})
export class AddNewBookComponent {

  constructor(private genreService:GanreService, private bookService:BookService, private authorService:AuthorService){}

  ngOnInit(){
    this.loadForm()
    this.loadGenre()
  }

  addAuthorBook:any
  author:Author= ({} as Author)
  genre:Genre[]= [];
  selected:string | undefined;

  getAuthor(author:Author){

  this.author = author
  }

  addNewBook(name:string, countPages:string){
    this.bookService.addNewBook(name, Number(countPages), Number(this.selected)).subscribe((res:Book)=> {
    this.author.listBook.push(res.id);
    this.authorService.editAuthor(this.author).subscribe((res:Author)=> this.updBook.emit("Обновлено") )
    })
  }




  loadGenre(){
    this.genreService.getGenre().subscribe((res:Genre[])=> {
      this.genre = res})
  }




  loadForm(){
    this.addAuthorBook= new FormGroup({
      // email: new FormControl("", [Validators.required, Validators.email]),
      // pass: new FormControl("", [Validators.required, Validators.minLength(6)]),
    })




  }
  @Output()
  updBook: EventEmitter<string> = new EventEmitter;


}
