import { Component, Input } from '@angular/core';
import { Author } from 'src/app/interface/author';
import { CollectionBooks } from 'src/app/interface/book';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-detais-author',
  templateUrl: './detais-author.component.html',
  styleUrls: ['./detais-author.component.scss']
})
export class DetaisAuthorComponent {

  constructor(private authorService:AuthorService){}

  authorDetails:Author = ({} as Author)
  authorBooks:CollectionBooks[]=[];

  takeAuthorDetails(author:Author){
    this.authorDetails = author;
    this.getAuthorBooks()
  }

  getAuthorBooks(){
    this.authorService.getAutorBooks(this.authorDetails.id).subscribe((res:CollectionBooks[])=> this.authorBooks = res)
  }



}
