import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  apiUrl =  'http://localhost:3000/users';
  apiRole =  'http://localhost:3000/role';

  getAll(){
    return this.http.get(this.apiUrl);
  }

  getByCode(code: any){
    return this.http.get(this.apiUrl+'/'+code);
  }

  proccedRegister(inputData: any){
    return this.http.post(this.apiUrl, inputData);
  }

  updatedUser(code: any, inputData: any){
    return this.http.put(this.apiUrl+'/'+code, inputData);
  }

  isLoggedIn(){
    return sessionStorage.getItem('username')!= null;
  }

  getUserRole(){
    return sessionStorage.getItem('userrole')!= null ? sessionStorage.getItem('userrole')?.toString():'';
  }

  getAllRole(){
    return this.http.get(this.apiRole);
  }

}

