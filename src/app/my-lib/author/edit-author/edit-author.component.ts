import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Author} from 'src/app/interface/author';
import { CollectionBooks } from 'src/app/interface/book';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss']
})
export class EditAuthorComponent {

  constructor(private authorService:AuthorService, private router:Router, private bookService:BookService){
  }
//автор
  authorDetails:Author = ({} as Author)
  editAuthorForm:any;
  authorBooks:CollectionBooks[]=[];
  authorEditBook:boolean = false;
  addAuthorBook:any


//обновляем автора
  nextEditAuthor(key:Author){
    this.authorDetails = key
    this.loadForm()
    this.getAuthorBooks()
  }

//редактируем автора
  editAuthor(name:string, lastName:string, surname:string, dateBirth:string){
    this.authorDetails.fisrtName = name;
    this.authorDetails.lastName = lastName;
    this.authorDetails.surname = surname;
    this.authorDetails.dateBirth = dateBirth;
    this.authorService.editAuthor(this.authorDetails).subscribe((res:any)=> this.myUpd.emit("автор обновлен"))
  }

//Создаем реактивную форму
  loadForm(){
    this.editAuthorForm= new FormGroup({
      fisrtName: new FormControl(`${this.authorDetails.fisrtName}`, [Validators.required, Validators.pattern("[a-zA-Zа-яёА-ЯЁ]{3,10}")] ),
      lastName: new FormControl(`${this.authorDetails.lastName}`, [Validators.required, Validators.pattern("[a-zA-Zа-яёА-ЯЁ]{3,10}")] ),
      surname: new FormControl(`${this.authorDetails.surname}`, []),
      dateBirth: new FormControl(`${this.authorDetails.dateBirth}`, [Validators.pattern("^[0-9]{2}[\.]{1}[0-9]{2}[\.]{1}[0-9]{4}"), Validators.required]),

    })
  }

//Получаем все книги автора
  getAuthorBooks(){
    this.authorService.getAutorBooks(this.authorDetails.id).subscribe((res:any)=> this.authorBooks = res)
  }

// Удаляем книгу автора
  delAuthorBook(bookId:number){
    let newListBooks = this.authorDetails.listBook.filter((book:number)=> book!=bookId)
    this.authorDetails.listBook = newListBooks
    this.authorService.delAuthorBook(this.authorDetails).subscribe((res:Author)=> {
      this.myUpd.emit("Книга автора удалена")
      this.getAuthorBooks()})
  }
// отправляю книгу на изменение, знаю что лучше через маршрутизацию, но подумал об этом уже слишком поздно:(
  editAuthorBook(book:CollectionBooks){
    this.bookService.getBookEdit(book)
    this.router.navigateByUrl("books")
  }

//вызываем блок добавления книги текущему автору
  addNewBookThisAuthor(){
    this.authorEditBook= !this.authorEditBook
    setTimeout((()=> this.addBookBlock?.getAuthor(this.authorDetails)),0)
  }

//обновлям данные после обновления
  upateInfoAfrerAddBook(event:string){
    this.myUpd.emit("Добавлена новая книга автору")
    this.getAuthorBooks();
  }

  @ViewChild(AddNewBookComponent) addBookBlock:AddNewBookComponent | undefined;

  @Output()
myUpd: EventEmitter<string> = new EventEmitter

}


