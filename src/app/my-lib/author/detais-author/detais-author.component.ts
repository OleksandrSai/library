import { Component, Input } from '@angular/core';
import { Author } from 'src/app/interface/author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-detais-author',
  templateUrl: './detais-author.component.html',
  styleUrls: ['./detais-author.component.scss']
})
export class DetaisAuthorComponent {

  constructor(private authorService:AuthorService){}

  authorDetails:Author = ({} as Author)

  takeAuthorDetails(author:Author){
    this.authorDetails = author;
  }


}
