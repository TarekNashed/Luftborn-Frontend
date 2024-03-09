import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment-Production';
import { ILogin } from '../Models/ilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient:HttpClient,private cookieService: CookieService) { }

  AuthUser(user:ILogin):Observable<any>{
    return this.httpClient.post<any>(`${environment.ApiUrl}/Auth/Login`,user);
  }
  AddAuthUser(user:ILogin):Observable<any>{
    return this.httpClient.post<any>(`${environment.ApiUrl}/Auth/Register`,user);
  }
  getAuthToken():string{
    const isTokenExist: boolean = this.cookieService.check('Token');
    if(isTokenExist){
      return this.cookieService.get('Token');
    }
    else{
      return "";
    }
  }
}
