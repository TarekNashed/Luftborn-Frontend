import { Component, Inject, OnInit } from '@angular/core';
import { DepartmentService } from './../../../Services/department.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUpdateDepartment } from 'src/app/Models/iupdate-department';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertServiceService } from 'src/app/Services/alert-service.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {
  constructor(private departmentAPi:DepartmentService,private dialog:MatDialogRef<UpdateDepartmentComponent>,private formbuilder:FormBuilder,private alert:AlertServiceService,
    @Inject(MAT_DIALOG_DATA) data:any){
    this.UpdateForm = this.formbuilder.group({
      code:[null,Validators.required],
      name: [null,Validators.required],
      isActive:[true,Validators.required]
    });
    this.deparmtmen = data;
    console.log(data);
  }
  deparmtmen:any;
  ngOnInit(): void {
    this.setValues();
  }

  UpdateForm!:FormGroup;

  setValues(){
    this.UpdateForm.patchValue({
      code:this.deparmtmen.code,
      name:this.deparmtmen.name,
      isActive:this.deparmtmen.isActive
    })
  }
get code(){
  return this.UpdateForm.get('code')?.value;
}

get name(){
  return this.UpdateForm.get('name')?.value;
}

get isActive(){
  return this.UpdateForm.get('isActive')?.value;
}

  submit(){
    let updateModel:IUpdateDepartment = {
      code:this.code,
      isActive:this.isActive,
      id:this.deparmtmen.id,
      name:this.name
    }

    this.departmentAPi.UpdateDepartment(updateModel).subscribe({
      next:(res)=>{
        this.alert.openSnackBarWithMessageSuccess("Department Updated Successfully","Updated",3);
        this.dialog.close()
      },
      error:(err)=>{
        this.alert.openSnackBarWithMessageDanger("Faild To Update The Department Make Sure You Filled All Fileds","Error",3);
      }
    })
  }
}
