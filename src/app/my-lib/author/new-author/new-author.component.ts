import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.scss']
})
export class NewAuthorComponent {

  constructor(private authorService:AuthorService){}

  addUserForm:any;
  authorEditBook:boolean = false;

  ngOnInit(){
    this.loadForm()
  }


  loadForm(){
    this.addUserForm= new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Zа-яёА-ЯЁ]{3,10}")]),
      lastname: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Zа-яёА-ЯЁ]{3,10}")]),
      surname: new FormControl(""),
      dateBirth: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{2}[\.]{1}[0-9]{2}[\.]{1}[0-9]{4}")]),
    })
  }

  Submit(fisrtName:string, lastName:string, surname:string, dateBirth:string){
    this.authorService.addNewAuthor(fisrtName,lastName,surname,dateBirth).subscribe(el=> this.myUpd.emit("автор добавлен"))
  }

  @Output()
  myUpd: EventEmitter<string> = new EventEmitter



}
