import { Injectable } from '@angular/core';
import { InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let  author = [
      {id: 1, lastName: "Flanagan", fisrtName: "David",
      surname:" ",  dateBirth: "01.01.1960", listBook: [2,4,3]},
      {id: 2, lastName: "Kosach", fisrtName: "Larysa",
      surname:"Petrivna",  dateBirth: "25.02.1871", listBook: [1,2,3]},
      {id: 3, lastName: "Sai", fisrtName: "Oleksandr",
      surname:"Valerievich",  dateBirth: "09.02.1996", listBook: [4,3]}
    ];
    let books = [
      {id: 1, name: "testBook", countPages: 150, genreBook:1},
      {id: 2, name: "testBook2", countPages: 160, genreBook:2},
      {id: 3, name: "testBook3", countPages: 180, genreBook:3},
      {id: 4, name: "ggg", countPages: 200, genreBook:2}
    ];
    let  genre = [
      {id: 1, genre:"Advent"},
      {id: 2, genre:"Beckend"},
      {id: 3, genre:"Horror"},
    ]
    return {author,books,genre}
  }

}
