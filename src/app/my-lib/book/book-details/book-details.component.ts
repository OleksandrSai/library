import { Component } from '@angular/core';
import { Book, CollectionBooks } from 'src/app/interface/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  bookDetails:CollectionBooks = ({} as CollectionBooks)

  getBookDetails(book:CollectionBooks){
    this.bookDetails = book;
  }

}
