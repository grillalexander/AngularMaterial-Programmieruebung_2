import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Store } from './store';
import { Course } from './Interfaces/Course';
import { RegistrationDto, RegistrationModel } from './Interfaces/Registration';

@Injectable({
  providedIn: 'root',
})
export class Backend {
  private http = inject(HttpClient);
  private store = inject(Store);

  public getCourses() {
    this.http
      .get<Course[]>('http://localhost:3000/courses?_expand=eventLocation')
      .subscribe({
        next: (data) => {
          this.store.courses = data;
        },
        error: (err) => {
          console.error('Fehler beim Laden der Kurse:', err);
        },
      });
  }

  public getRegistrations() {
    this.http
      .get<RegistrationDto[]>('http://localhost:3000/registrations?_expand=course')
      .subscribe({
        next: (data) => {
          this.store.registrations = data;
        },
        error: (err) => {
          console.error('Fehler beim Laden der Anmeldungen:', err);
        },
      });
  }

  public addRegistration(registration: RegistrationModel) {
    this.http.post('http://localhost:3000/registrations', registration).subscribe({
      next: () => {
        this.getRegistrations();
      },
      error: (err) => {
        console.error('Fehler beim Hinzufügen der Anmeldung:', err);
      },
    });
  }
}
