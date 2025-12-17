import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Store } from './store';
import { Course } from './Interfaces/Course';
import { RegistrationDto, RegistrationModel } from './Interfaces/Registration';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Backend {
  private http = inject(HttpClient);
  private store = inject(Store);
  private snackBar = inject(MatSnackBar);

  public getCourses() {
    this.http
      .get<Course[]>('http://localhost:3000/courses?_expand=eventLocation')
      .subscribe({
        next: (data: Course[]) => {
          this.store.courses.set(data);
        },
        error: (err: any) => {
          console.error('Fehler beim Laden der Kurse:', err);
          this.snackBar.open('Fehler beim Laden der Kurse. Bitte versuchen Sie es später erneut.', 'Schließen', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
  }

  public getRegistrations() {
    this.http
      .get<RegistrationDto[]>('http://localhost:3000/registrations?_expand=course')
      .subscribe({
        next: (data: RegistrationDto[]) => {
          this.store.registrations.set(data);
        },
        error: (err: any) => {
          console.error('Fehler beim Laden der Anmeldungen:', err);
          this.snackBar.open('Fehler beim Laden der Anmeldungen. Bitte versuchen Sie es später erneut.', 'Schließen', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
  }

  public addRegistration(registration: RegistrationModel) {
    this.http.post('http://localhost:3000/registrations', registration).subscribe({
      next: () => {
        this.getRegistrations();
        this.snackBar.open('Anmeldung erfolgreich hinzugefügt!', 'Schließen', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (err: any) => {
        console.error('Fehler beim Hinzufügen der Anmeldung:', err);
        this.snackBar.open('Fehler beim Hinzufügen der Anmeldung. Bitte versuchen Sie es erneut.', 'Schließen', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  public deleteRegistration(registrationId: string) {
    return this.http.delete(`http://localhost:3000/registrations/${registrationId}`);
  }

  public showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Schließen', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public showErrorMessage(message: string) {
    this.snackBar.open(message, 'Schließen', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
