import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, action: string = 'Fechar', duration: number = 3000) {
    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
    };

    this.snackBar.open(message, action, config);
  }
}
