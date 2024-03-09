import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {
  constructor(private _snackBar: MatSnackBar) { }
  openSnackBarWithMessageSuccess(message: string, action: string , sec:number) {
    this._snackBar.open(message, action , {
      duration : sec*1000,
      panelClass: ["green-snackbar"],
    });
  }

  openSnackBarWithMessageDanger(message: string, action: string , sec:number) {
    this._snackBar.open(message, action , {
      duration : sec*1000,
      panelClass: ["red-snackbar"],
    });
  }
}
