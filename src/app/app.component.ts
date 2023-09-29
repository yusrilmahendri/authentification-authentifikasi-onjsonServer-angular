import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'auth-angular';
  menuRequired = false;
  isAdminUser = false;

  constructor(private route:Router, private service: AuthService){}

  ngDoCheck(): void {
    let currentUrl = this.route.url;
    if(currentUrl == '/login' || currentUrl == '/register'){
      this.menuRequired = false;
    }else{
      this.menuRequired = true;
    }
    if(this.service.getUserRole() === 'admin'){
      this.isAdminUser = true;
    }else {
      this.isAdminUser = false;
    }
  }
}

