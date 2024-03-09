import { DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/Services/department.service';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertServiceService } from 'src/app/Services/alert-service.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  displayedColumns: string[] = ['name','code','Status','Operation'];

  dataSourceOfDepartments = new MatTableDataSource();
  @ViewChild('paginatorOfDepartments')paginatorOfDepartments!: MatPaginator;
  @ViewChild(MatSort)sortOfDepartments!: MatSort;
  @ViewChild('myElement', { static: true }) myElement!: ElementRef;


  constructor(private departmentApi:DepartmentService,private dialog:MatDialog,private alert:AlertServiceService){}
  ngOnInit(): void {
    this.loadData();
  }
  showLoader:any;
  allDepartments:any;
  loadData(){
    this.showLoader=true;
    this.departmentApi.GetAllDepartments()
    .subscribe({
      next:(res:any)=>{
        this.allDepartments=res.data;
        this.dataSourceOfDepartments = new MatTableDataSource(res.data);
        this.dataSourceOfDepartments.paginator = this.paginatorOfDepartments;
        this.dataSourceOfDepartments.sort = this.sortOfDepartments;
        this.showLoader=false;
      }
    });
  }

  departments:any = [
    {id:1,name:""}
  ]

  OpenUpdateDepartment(dep:any){
    const dialogRef = this.dialog.open(UpdateDepartmentComponent,{
      data:dep,
      width:'60%',
      height:'80%'
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed){
        this.ngOnInit();
      }
    });
  }

  OpenAddDepartment(){
    const dialogRef = this.dialog.open(AddDepartmentComponent,{
      width:'50%',
      height:'45%'
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed){
        this.ngOnInit();
      }
    });
  }

  DeleteDepartment(id:number){
    this.departmentApi.DeleteDepartment(id).subscribe({
      next:(res)=>{
        this.alert.openSnackBarWithMessageSuccess("Department Deleted Successfully","Deleted",3);
      },error:(err)=>{
        this.alert.openSnackBarWithMessageDanger("Failed To Delete Department","Error",3);
      }
    })
  }
}
