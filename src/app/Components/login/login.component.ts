import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ILogin } from 'src/app/Models/ilogin';
import { AlertServiceService } from 'src/app/Services/alert-service.service';
import { AuthService } from 'src/app/Services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user:any;
  istext:boolean = false;
  type:string = 'password';
  icon:string = 'visibility_off'
  loading:boolean =false;
  resetPasswordEmail:string='';
  constructor(private router:Router,private activeroute:ActivatedRoute,private toastr:AlertServiceService,private auth:AuthService,private cookieService: CookieService){}
  loginform=new FormGroup({
    UserName: new FormControl("",Validators.required),
    Password:new FormControl("",[Validators.required,Validators.minLength(4)]),
  });

  get UserName(){
    return this.loginform.controls.UserName;
  }
  
  get UserPassword(){
    return this.loginform.controls.Password;
  }
  
  showPassword(){
    this.istext = !this.istext;
    this.istext ? this.type = 'text':this.type='password';
    this.istext ? this.icon = 'visibility':this.icon='visibility_off';
  }

  submitLogin(){
    if(this.loginform.valid){
      let user:ILogin={
        email: this.loginform.value.UserName!,
        password:this.loginform.value.Password!,
      };

      this.auth.AuthUser(user).subscribe({
        next:(resp:any)=>{
          this.toastr.openSnackBarWithMessageSuccess("Welcome...","Success",3);
          this.router.navigate(['/Department']);
          this.cookieService.set('Token',resp.message);
        },
        error:(err:any)=>{
          this.toastr.openSnackBarWithMessageDanger("Error","Error",3);
        }
      })
    }else{
      this.toastr.openSnackBarWithMessageSuccess("Please Provide Both UserName And Password","Error",3);
    }
  }
  RegisterForm(){
    this.router.navigate(["/Register"]);
  }
}
