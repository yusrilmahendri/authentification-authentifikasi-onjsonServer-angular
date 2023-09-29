import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private builder: FormBuilder, private toastr:ToastrService,
    private service: AuthService,
    private route: Router,
    ){
      sessionStorage.clear();
    }

  userData: any;
  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  procceedLogin(){
    if(this.loginForm.valid) {
      this.service.getByCode(this.loginForm.value.username).subscribe( res => {
        this.userData = res;
        if(this.userData.password === this.loginForm.value.password){
          if(this.userData.isactive){
            sessionStorage.setItem('username', this.userData.id);
            sessionStorage.setItem('userrole', this.userData.role);
            this.route.navigate(['']);
          }else{
            this.toastr.error('Please contact admin', 'In Active User');
          }
        }else{
          this.toastr.error('Invalid password', 'Error');
        }
      }, (error) => {
       this.toastr.error('Error Occurred', 'Error');   
      });
    }else{
      this.toastr.error('Form is not valid', 'Validation Error');
    }
  }

}
