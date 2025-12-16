import { Course } from './Course';

// Vom Backend (DTO)
export interface RegistrationDto {
  id: string;
  name: string;
  birthdate: string;
  course?: Course;
  courseId: number;
}

export interface RegistrationModel {
  name: string;
  birthdate: string;
  courseId: number;
  newsletterEmail?: boolean;
}
