import { Injectable, signal } from '@angular/core';
import { RegistrationDto } from './Interfaces/Registration';
import { Course } from './Interfaces/Course';

@Injectable({
  providedIn: 'root',
})
export class Store {
  public courses = signal<Course[]>([]);
  public registrations = signal<RegistrationDto[]>([]);
}
