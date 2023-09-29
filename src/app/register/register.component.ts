import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private builder: FormBuilder, 
    private toastr: ToastrService,
    private service: AuthService,
    private route: Router){}

  registerForm = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    // password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')])),
    password: this.builder.control('', Validators.compose([Validators.required])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });

  proccedRegisteration(){
    if(this.registerForm.valid) {
      this.service.proccedRegister(this.registerForm.value).subscribe( res => {
        this.toastr.success('please contact admin for enable access','Registered successfully');
        this.route.navigate(['login']);
      });
    }else{
      this.toastr.warning('Please enter a valid data registration');
    }
  }
}
