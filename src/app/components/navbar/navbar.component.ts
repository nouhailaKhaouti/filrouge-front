import { Component,OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  loggedIn !: boolean;

  ngOnInit(): void {
    if(this.token.getToken() === null) {
      this.loggedIn = false;
    }

  }

  constructor(private token:TokenService){}
}
