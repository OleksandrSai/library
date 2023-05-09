import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { Author } from 'src/app/interface/author';
import { Book, CollectionBooks } from 'src/app/interface/book';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';
import { BookDetailsComponent } from './book-details/book-details.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { SerchComponent } from './serch/serch.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  constructor(private bookService:BookService, private authorService:AuthorService){}

AllBook:CollectionBooks[] = [];
AllAuthors:Author[]=[];
addBook:boolean = false;
infoUser:boolean = false;
editUser:boolean = false;
editBook:CollectionBooks = ({}  as CollectionBooks)
inputSerch:Observable<HTMLInputElement> = ({} as Observable<HTMLInputElement>)

activeSearch:string = '';

windowAdd(){
  this.addBook = true;
  this.infoUser = false;
  this.editUser = false;
}
windowDetails(){
  this.addBook = false;
  this.infoUser = true;
  this.editUser = false
}
windowEdit(){
  this.addBook = false;
  this.infoUser = false;
  this.editUser = true
}

ngAfterViewInit() {

  this.inputSerch = fromEvent((this.myInput as ElementRef).nativeElement, 'input');
  this.bookService.getInput(this.inputSerch)


}

@ViewChild(SerchComponent) serchComp: SerchComponent | undefined;
@ViewChild(EditBookComponent) edit:EditBookComponent | undefined;
@ViewChild(BookDetailsComponent) details:BookDetailsComponent | undefined;
@ViewChild('myInput') myInput: ElementRef | undefined;


goToLink(key:CollectionBooks){
this.bookDetails(key)
this.activeSearch = ""
}


myUpdateBook(event:any){
console.log(event)
this.reload()
}

reload(){
  this.bookService.getAllBooks().subscribe((res:CollectionBooks[])=> this.AllBook = res)
  this.waitCheck()
}

ngOnInit(){
  this.reload()

}
waitCheck(){
  if(this.bookService.takeFlag()) this.bookEdit(this.bookService.takeBook())
}

bookDetails(key:CollectionBooks){
  this.windowDetails()
  setTimeout(() => {
    this.details?.getBookDetails(key)
  }, 0);
}

bookEdit(key:CollectionBooks){
  this.windowEdit()
  setTimeout(() => {
    this.edit?.nextEditBook(key)
  }, 0);

}

// удаляем книгу, берем всех авторов, обновляем список кинг
bookdelete(id:number){
  this.bookService.deleteBook(id).subscribe((book:Book)=> {console.log("книга удалена")
  this.authorService.getAllAuthor().subscribe((x:Author[])=> {this.AllAuthors = x
    this.AllAuthors.forEach((author:Author)=> this.findBookBeforeDel(author, id) )})
})
  this.reload()
}

// ищем есть ли у какого-то автора удаленная напи кника
findBookBeforeDel(author:Author, id:number){
if(author.listBook.includes(id)) this.delBook(id,author)
}

// если есть то удаляем у автора удаленную нами книгу
delBook(id:number, author:Author){
let oldList = author.listBook
let newList = oldList.filter((x:number)=> x!=id)
author.listBook = newList
this.authorService.editAuthor(author).subscribe((x:any)=> x)
console.log("книга удалена у автора" +" " + author.lastName + " "+  author.fisrtName)
}

}
