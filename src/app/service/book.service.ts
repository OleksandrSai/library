import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, debounceTime, filter, map, Observable, reduce, switchMap, take, toArray } from 'rxjs';
import { Book, CollectionBooks } from '../interface/book';
import { Genre } from '../interface/genre';
import { AuthorService } from './author.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient, private authorService: AuthorService) {}

  waitBookEdit:CollectionBooks= ({} as CollectionBooks);
  editFlag:boolean = false;
  input:Observable<HTMLElement> = ({} as Observable<HTMLElement>)

  getBook():Observable<Book[]> {
    return this.http.get<Book[]>(`api/books/`);
  }
  getOneBook(id:number):Observable<Book> {
    return this.http.get<Book>(`api/books/${id}`);
  }

  collectionOfBooks():Observable<CollectionBooks>{
    return this.getBook().pipe(
      switchMap((x:Book[])=> x),
      concatMap((book:Book)=> {
        return this.getGenre().pipe(
          switchMap((genre:Genre[])=> genre),
          filter((genre:Genre)=> book.genreBook == genre.id),
          map((genre:Genre)=> {
            return{
              id: book.id,
              name:book.name,
              countPages:book.countPages,
              genre: genre.genre}}),
              )
      }),

    )
  }

  getAllBooks():Observable<CollectionBooks[]>{
    return this.collectionOfBooks().pipe(
      reduce((x: CollectionBooks[], y: CollectionBooks) => [...x, y], [])
    )
  }

  getGenre():Observable<Genre[]>{
    return this.http.get<Genre[]>(`api/genre/`);
  }

  editBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`api/books/${book.id}`, book).pipe(take(1));
  }

  addNewBook(name: string, countPages: number, genreBook: number,):Observable<Book> {
    return this.http.post<Book>('api/books', {
        name: name,
        countPages: countPages,
        genreBook: genreBook,
      })
      .pipe(take(1));
  }

  deleteBook(id:number):Observable<Book>{
    return this.http.delete<Book>(`api/books/${id}`).pipe(take(1))
  }

  getBookEdit(book:CollectionBooks){
    this.waitBookEdit = book;
    this.editFlag = true;
  }

  takeBook(){
    this.editFlag = false;
    return this.waitBookEdit
  }

  takeFlag(){
    return this.editFlag;
  }

  getInput(input:Observable<HTMLElement>){
    this.input = input
  }
  takeInput():Observable<HTMLElement>{
    return this.input
  }

  needSerch() :Observable<CollectionBooks[]>{
    return this.takeInput().pipe(
    map((x: any) => (x.target as HTMLInputElement).value),
    debounceTime(1000),
    switchMap((event: string) => {
      return this.getAllBooks().pipe(
        switchMap((res:CollectionBooks[]) => res),
        filter((book:CollectionBooks) => book.name.toLowerCase().includes((event as string).toLocaleLowerCase())),
        take(6),
        toArray(),
        take(1)
      );
    }))
  }




  }





