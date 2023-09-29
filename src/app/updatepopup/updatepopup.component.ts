import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.scss']
})
export class UpdatepopupComponent implements OnInit {


  constructor(
    private builder: FormBuilder, 
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private toastr: ToastrService, 
    private dialog: MatDialogRef<UpdatepopupComponent>){}
  
  editData: any;
  ngOnInit(): void {
   this.service.getAllRole().subscribe(res => {
    this.roleList = res;
   })

   if(this.data.userCode != null && this.data.userCode != ''){
    this.service.getByCode(this.data.userCode).subscribe(res => {
      this.editData = res;
      this.updatedForm.patchValue({
        id: this.editData.id, 
        name: this.editData.name,
        email: this.editData.email,
        password: this.editData.password, 
        role: this.editData.role,
        gender: this.editData.gender, 
        isactive: this.editData.isactive
        });
      });
    }
  }

  roleList: any;

  updatedForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    // password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')])),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });

  updateUser(){
    if(this.updatedForm.valid){
      this.service.updatedUser(this.updatedForm.value.id, this.updatedForm.value).subscribe(res => {
        this.toastr.success('data updated successfully');
        this.dialog.close();
      });
    }else{
      this.toastr.warning('Please enter input data so valid');
    }
  }
}
