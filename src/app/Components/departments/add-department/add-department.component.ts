import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IAddDepartment } from 'src/app/Models/iadd-department';
import { IUpdateDepartment } from 'src/app/Models/iupdate-department';
import { AlertServiceService } from 'src/app/Services/alert-service.service';
import { DepartmentService } from 'src/app/Services/department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  constructor(private departmetApi:DepartmentService,private dialogRef:MatDialogRef<AddDepartmentComponent>,private Formbuild:FormBuilder,private alert:AlertServiceService){
    this.AddForm = this.Formbuild.group({
      code:[null,Validators.required],
      name: [null,Validators.required],
      isActive:[true,Validators.required]
    })
  }
  ngOnInit(): void {
  }
  AddForm!:FormGroup;

  get code(){
    return this.AddForm.get('code')?.value;
  }
  
  get name(){
    return this.AddForm.get('name')?.value;
  }
  
  get isActive(){
    return this.AddForm.get('isActive')?.value;
  }
  submit(){
    let AddModel:IAddDepartment = {
      code:this.code,
      name :this.name,
      isActive:this.isActive,
    }

    this.departmetApi.AddDepartment(AddModel).subscribe({
      next:(res)=>{
        this.alert.openSnackBarWithMessageSuccess("Department Added Successfully","Added",3);
        this.dialogRef.close();
      },
      error:(err)=>{
        this.alert.openSnackBarWithMessageDanger("Error On Adding Department Try it Again with Valid Values","Error",3);
      }
    })
  }
}
