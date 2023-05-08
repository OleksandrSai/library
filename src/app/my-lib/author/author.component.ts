import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Author } from 'src/app/interface/author';

import { AuthorService } from 'src/app/service/author.service';
import { DetaisAuthorComponent } from './detais-author/detais-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  constructor(private authorService: AuthorService) {}

  AllAuthor: Author[] = [];
  addUser: boolean = false;
  infoUser: boolean = false;
  editUser: boolean = false;
  SortAllAuthor: [] = [];

  windowAdd() {
    this.addUser = true;
    this.infoUser = false;
    this.editUser = false;
  }
  windowDetails() {
    this.addUser = false;
    this.infoUser = true;
    this.editUser = false;
  }
  windowEdit() {
    this.addUser = false;
    this.infoUser = false;
    this.editUser = true;
  }

  @ViewChild(EditAuthorComponent) edit: EditAuthorComponent | undefined;
  @ViewChild(DetaisAuthorComponent) details: DetaisAuthorComponent | undefined;

  myDicription(event: string) {
    console.log(event);
    this.reload();
  }

  reload() {
    this.authorService
      .getAllAuthor()
      .subscribe((el: Author[]) => (this.AllAuthor = el));
  }

  ngOnInit() {
    this.reload();
  }
  ngDoCheck() {
    if (this.SortAllAuthor.length != 0) this.AllAuthor = this.SortAllAuthor;
  }

  authorDetails(key: Author) {
    this.windowDetails();

    setTimeout(() => {
      this.details?.takeAuthorDetails(key);
    }, 0);
  }

  authorEdit(key: Author) {
    this.windowEdit();
    setTimeout(() => {
      this.edit?.nextEditAuthor(key);
    }, 0);
  }

  authordelete(id: number) {
    this.authorService.deleteAuthor(id).subscribe((el) => console.log(el));
    this.reload();
  }

  sort(value: string) {
    switch (value) {
      case 'books':
        this.AllAuthor.sort(
          (a: Author, b: Author) =>
            (b.countBook as number) - (a.countBook as number)
        );
        break;
      case 'author(A-Z)':
        this.AllAuthor.sort((a: Author, b: Author) => {
          if (b.lastName.charAt(1) < a.lastName.charAt(1)) return -1;
          if (b.lastName.charAt(1) > a.lastName.charAt(1)) return 1;
          return 0;
        });
        break;
      case 'author(Z-A)':
        this.AllAuthor.sort((a: Author, b: Author) => {
          if (b.lastName.charAt(1) < a.lastName.charAt(1)) return -1;
          if (b.lastName.charAt(1) > a.lastName.charAt(1)) return 1;
          return 0;
        });
        this.AllAuthor = this.AllAuthor.reverse()
        break;

        case 'no':
          this.reload()
          break;
    }
  }
}
