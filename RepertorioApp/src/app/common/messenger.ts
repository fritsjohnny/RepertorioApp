import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Messenger {
  constructor(private snackBar: MatSnackBar) { }

  errorHandler(err: any): Observable<any> {
    const message = this.extractMessage(err);

    console.log('Erro tratado:', message);

    this.snackBar.open(message, 'Fechar', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });

    return throwError(err);
  }

  message(response: any, duration: number = 10000): void {
    const message = this.extractMessage(response);

    this.snackBar.open(message, 'Fechar', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }

  public extractMessage(input: any): string {
    if (!input) return 'Erro inesperado.';

    if (typeof input === 'string') return input;

    // Mensagem padrão de erro vinda de input.error
    if (input?.error?.message) return input.error.message;

    // Detalhes padrão
    if (input?.error?.detail) return input.error.detail;

    if (input?.error && typeof input.error === 'string') return input.error;

    // Trata modelo de erro de validação ASP.NET: errors -> { field: [ "msg1", "msg2" ] }
    if (input?.error?.errors) {
      const errorObj = input.error.errors;
      const mensagens: string[] = [];

      for (const campo in errorObj) {
        if (Array.isArray(errorObj[campo])) {
          mensagens.push(...errorObj[campo].map((msg: string) => `${campo}: ${msg}`));
        }
      }

      if (mensagens.length > 0) return mensagens.join('\n');
    }

    if (input?.message) return input.message;

    return 'Erro inesperado.';
  }
}
