import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, CollectionBooks } from 'src/app/interface/book';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-serch',
  templateUrl: './serch.component.html',
  styleUrls: ['./serch.component.scss']
})
export class SerchComponent {

  constructor(private bookService:BookService){}

  serhArray:CollectionBooks[] = []

  wait:string | undefined

  @Output()
  linkSearch:EventEmitter<CollectionBooks> = new EventEmitter

  goToLink(key:CollectionBooks){
  this.linkSearch.emit(key)
  }

  ngOnInit(){
    if(!this.serhArray.length)  this.wait = "Search.."
    setTimeout((()=>{ if(this.wait && !this.serhArray.length) this.wait = "no no result"; else this.wait = undefined}),3000)
    this.takeSerchInput()
  }


  takeSerchInput(){
    this.bookService.needSerch().subscribe((x:CollectionBooks[])=> { this.serhArray = x; if(!this.serhArray.length)  this.wait = "Search.."
    else  this.wait = undefined })
  }



}
