import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, reduce, switchMap, take } from 'rxjs';
import { Book } from '../interface/book';
import { Genre, GenreId } from '../interface/genre';

@Injectable({
  providedIn: 'root'
})
export class GanreService {

  constructor(private http:HttpClient) { }

  getGenre():Observable<Genre[]>{
    return this.http.get<Genre[]>(`api/genre/`)
  }


  getAllInfoGenre():Observable<Genre[]>{
    return this.getBooks().pipe(
      switchMap((book:Book[])=> book),
      reduce((acc:any, el:Book)=> {
        acc[el.genreBook] = (acc[el.genreBook] || 0) +1
        return acc
      },{}),
      switchMap((x:any)=>{
        return this.getGenre().pipe(
          switchMap((genre:Genre[])=> genre),
          map((genre:Genre)=> {
            return{
              id:genre.id,
              genre:genre.genre,
              countBooks: (x[genre.id] || 0)
            }
          }),
            reduce((x:any, y:any)=> [...x, y], [])
        )
      })
      )
    }


  getBooks():Observable<Book[]>{
    return this.http.get<Book[]>(`api/books/`)
  }

  addNewGenre(genre: string):Observable<Genre> {
    return this.http.post<Genre>('api/genre', {
        genre: genre,
      })
      .pipe(take(1));
  }

  editGenre(genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`api/books/${genre.id}`, genre).pipe(take(1));
  }

  deleteGenre(id:number):Observable<Genre>{
    return this.http.delete<Genre>(`api/genre/${id}`).pipe(take(1))
  }
}
