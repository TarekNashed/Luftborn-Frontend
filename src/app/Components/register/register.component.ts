import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertServiceService } from 'src/app/Services/alert-service.service';
import { AuthService } from 'src/app/Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { IRegister } from 'src/app/Models/iregister';
import { ILogin } from 'src/app/Models/ilogin';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:any;
  istext:boolean = false;
  type:string = 'password';
  icon:string = 'visibility_off'
  loading:boolean =false;
  constructor(private router:Router,private activeroute:ActivatedRoute,private toastr:AlertServiceService
    ,private auth:AuthService,private cookieService: CookieService){}
    registerform=new FormGroup({
    firstName: new FormControl("",[Validators.required,Validators.minLength(3)]),
    lastName:new FormControl("",[Validators.required,Validators.minLength(3)]),
    email:new FormControl("",[Validators.required,Validators.minLength(4)]),
    password:new FormControl("",[Validators.required,Validators.minLength(4)]),
    confirmPassword:new FormControl("",[Validators.required,Validators.minLength(4)]),
});
  get Email(){
    return this.registerform.controls.email;
  }
  
  get UserPassword(){
    return this.registerform.controls.password;
  }
  get UserConfirmPassword(){
    return this.registerform.controls.confirmPassword;
  }
  
  showPassword(){
    this.istext = !this.istext;
    this.istext ? this.type = 'text':this.type='password';
    this.istext ? this.icon = 'visibility':this.icon='visibility_off';
  }
  submitRegister(){
    if(this.registerform.valid){
      let user:IRegister={
        firstName: this.registerform.value.firstName!,
        lastName:this.registerform.value.lastName!,
        email:this.registerform.value.email!,
        password:this.registerform.value.password!,
        confirmPassword:this.registerform.value.confirmPassword!
      };

      this.auth.AddAuthUser(user).subscribe({
        next:(resp:any)=>{
          this.toastr.openSnackBarWithMessageSuccess("Welcome...","Success",3)
          this.router.navigate(["/Login"]);
        },
        error:(err:any)=>{
          this.toastr.openSnackBarWithMessageDanger("Error","Error",3);
        }
      })
    }else{
      this.toastr.openSnackBarWithMessageSuccess("Please provide all data in the form to register","Error",3);
    }
  }
  LoginForm(){
    this.router.navigate(["/Login"]);
  }
}
