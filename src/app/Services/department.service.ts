import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment/environment-Production';
import { IAddDepartment } from '../Models/iadd-department';
import { IUpdateDepartment } from '../Models/iupdate-department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

  GetAllDepartments(){
    return this.http.get(`${environment.ApiUrl}/Department/GetAllDepartments`);
  }
  GetDepartmentByID(id:number){
    return this.http.get(`${environment.ApiUrl}/Department/GetDepartmentById/${id}`);
  }
  UpdateDepartment(updateModel:IUpdateDepartment){
    return this.http.post(`${environment.ApiUrl}/Department/Update`,updateModel);
  }
  AddDepartment(addDepartment:any){
     return this.http.post(`${environment.ApiUrl}/Department/Add`,addDepartment);
  }
  DeleteDepartment(id:number){
    return this.http.post(`${environment.ApiUrl}/Department/Delete/${id}`,{});
  }

}
