export interface Author {
  id:number,
  fisrtName: string,
  lastName:string,
  surname:string,
  listBook:number[],
  dateBirth:string,
  countBook?:number
}
export interface AuthorBooks {
  id:number,
  name:string,
  countPages:string,
  genre:string
}

