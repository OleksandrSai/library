import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  concatMap,
  filter,
  map,
  Observable,
  reduce,
  switchMap,
  take,
  toArray,
} from 'rxjs';
import { Author } from '../interface/author';
import { Book, CollectionBooks } from '../interface/book';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}

  myId: number | undefined;

  arrDetailAuthor: Author = {} as Author;

  takeAuthorh(key: Author) {
    this.arrDetailAuthor = key;
  }
  getAuthorKey(): Author {
    return this.arrDetailAuthor;
  }

  getAllAuthor(): Observable<Author[]> {
    return this.http.get<Author[]>('api/author').pipe(
      switchMap((event: Author[]) => event),
      map((x: Author) => {
        x.countBook = (x.listBook as []).length;
        return x;
      }),
      toArray(),
      take(1)
    );
  }

  addNewAuthor(fisrtName: string,lastName: string,surname: string,dateBirth: string) {
    return this.http
      .post('api/author', {
        fisrtName: fisrtName,
        lastName: lastName,
        surname: surname,
        dateBirth: dateBirth,
        listBook: [],
      })
      .pipe(take(1));
  }

  deltailAuthor(id: number) {
    return this.http
      .get(`api/author/${id}`)
      .pipe(toArray())
      .subscribe((res: any) => {
        this.arrDetailAuthor = res;
        console.log(res);
      });
  }

  deleteAuthor(id: number) {
    return this.http.delete(`api/author/${id}`).pipe(take(1));
  }

  editAuthor(author: Author) {
    return this.http.put<Author>(`api/author/${author.id}`, author).pipe(take(1));
  }

  searchingForInformationBooks(id: number):Observable<CollectionBooks> {
    return this.getAuthorBook(id).pipe(
      map((x: any) => x.listBook),
      switchMap((x: any) => x),
      concatMap((event: any) => {
        return this.getBook().pipe(
          switchMap((x: any) => x),
          filter((x: any) => x.id == event),
          switchMap((event2: any) => {
            return this.getGenre().pipe(
              switchMap((x: any) => x),
              filter((x: any) => x.id == event2.genreBook),
              map((x) => {
                return {
                  id: event2.id,
                  name: event2.name,
                  countPages: event2.countPages,
                  genre: x.genre,
                };
              })
            );
          })
        );
      })
    );
  }

  getAutorBooks(id:number):Observable<CollectionBooks[]>  {
    return this.searchingForInformationBooks(id).pipe(
      reduce((x: any, y: any) => [...x, y], []),
      take(1)
    );
  }

  getAuthorBook(id: number) {
    return this.http.get(`api/author/${id}`);
  }
  getBook() {
    return this.http.get(`api/books/`);
  }
  getGenre():Observable<Book[]> {
    return this.http.get<Book[]>(`api/genre/`);
  }

  delAuthorBook(author: Author):Observable<Author> {
    return this.http.put<Author>(`api/author/${author.id}`, author).pipe(take(1));
  }
}
