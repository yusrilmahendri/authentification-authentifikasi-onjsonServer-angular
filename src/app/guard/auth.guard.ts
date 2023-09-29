import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      if(route.url.length > 0){
        let menu = route.url[0].path;
        if(menu == 'user'){
          if(this.authService.getUserRole() == 'admin'){
            return true;
          }else{
            this.toastr.warning('you dont have access');
            this.router.navigate(['']);
            return false;
          }
        }else{
          return true;
        }
      }else{
        return true;
      }
    } else {
      this.toastr.error('Anda harus login untuk mengakses halaman ini', 'Akses Ditolak');
      return this.router.navigate(['/login']);
    }
  }
}
