import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorComponent } from 'src/app/my-lib/author/author.component';
import { AuthorService } from 'src/app/service/author.service';
import { AddNewBookComponent } from '../edit-author/add-new-book/add-new-book.component';

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

ngDoCheck(){

}

@Output()
myUpd: EventEmitter<string> = new EventEmitter




  loadForm(){
    this.addUserForm= new FormGroup({
      // email: new FormControl("", [Validators.required, Validators.email]),
      // pass: new FormControl("", [Validators.required, Validators.minLength(6)]),
    })
  }

  Submit(fisrtName:string, lastName:string, surname:string, dateBirth:string){

    this.authorService.addNewAuthor(fisrtName,lastName,surname,dateBirth).subscribe(el=> this.myUpd.emit("автор добавлен"))


  }




}
