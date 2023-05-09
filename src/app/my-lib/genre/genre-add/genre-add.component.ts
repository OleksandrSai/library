import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/interface/author';
import { Genre } from 'src/app/interface/genre';
import { GanreService } from 'src/app/service/ganre.service';

@Component({
  selector: 'app-genre-add',
  templateUrl: './genre-add.component.html',
  styleUrls: ['./genre-add.component.scss']
})
export class GenreAddComponent {

  constructor(private genreService:GanreService){}

  ngOnInit(){
    this.loadForm()
    this.loadGenre()
  }

  addBook:any
  author:Author= ({} as Author)
  genre:Genre[]= [];
  selected:string | undefined;

  getAuthor(author:Author){

  this.author = author
  }

  addNewGenre(name:string){
    this.genreService.addNewGenre(name).subscribe((x:Genre)=>{
      this.updGenre.emit("Добавлен новый жанр - " + name)
    })  }

  loadGenre(){
    this.genreService.getGenre().subscribe((res:Genre[])=> {
      this.genre = res})
  }

  loadForm(){
    this.addBook= new FormGroup({
      name: new FormControl("", [Validators.required]),
    })
  }
  @Output()
  updGenre: EventEmitter<string> = new EventEmitter;



}
