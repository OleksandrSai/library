import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewChecked, DoCheck {

  constructor(private router:Router){}
  link:string | undefined;

  @ViewChild("author") author:MatButton | undefined
  @ViewChild("book") book:MatButton | undefined;
  @ViewChild("genre") genre:MatButton | undefined;


  ngAfterViewChecked(): void {
    if(this.link === "/") (this.author as MatButton).color = "accent"
    else (this.author as MatButton).color = "warn"
    if(this.link == "/books") (this.book as MatButton).color = "accent"
    else (this.book as MatButton).color = "warn"
    if(this.link == "/genre") (this.genre as MatButton).color = "accent"
    else (this.genre as MatButton).color = "warn"
  }

  ngDoCheck(){
    this.link = this.router.url

  }


}
