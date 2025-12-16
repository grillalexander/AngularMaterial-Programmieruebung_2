import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '../../shared/store';
import { Backend } from '../../shared/backend';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-data',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './add-data.html',
  styleUrl: './add-data.scss',
})
export class AddData {
  public store = inject(Store);
  public backend = inject(Backend);
  private fb = inject(FormBuilder);
  public signupForm: any;

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      courseId: ['', Validators.required],
      newsletterEmail: [false],
    });
    
    // Ensure courses are loaded
    if (this.store.courses.length === 0) {
      this.backend.getCourses();
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      let formData = this.signupForm.value;
      if (formData.birthdate instanceof Date) {
        formData.birthdate = formData.birthdate.toISOString().split('T')[0];
      }
      this.backend.addRegistration(formData);
      this.signupForm.reset({
        name: '',
        birthdate: '',
        courseId: '',
        newsletterEmail: false,
      });
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Dieses Feld ist erforderlich';
    }
    return '';
  }
}
