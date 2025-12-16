import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '../../shared/store';
import { Backend } from '../../shared/backend';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';
import { RegistrationDto } from '../../shared/Interfaces/Registration';

@Component({
  selector: 'app-data',
  imports: [
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './data.html',
  styleUrl: './data.scss',
})
export class Data implements OnInit {
  public store = inject(Store);
  public backend = inject(Backend);
  private dialog = inject(MatDialog);

  // Pagination state
  public readonly pageSizeOptions = [5, 10, 25, 50];
  public readonly pageSize = signal(5);
  public readonly pageIndex = signal(0);
  public readonly deletingIds = signal<Set<string>>(new Set());

  // Computed properties
  public readonly paginatedRegistrations = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.store.registrations.slice(start, end);
  });

  public readonly totalRegistrations = computed(() => this.store.registrations.length);

  public readonly hasRegistrations = computed(() => this.totalRegistrations() > 0);

  ngOnInit(): void {
    // Always ensure data is loaded when component initializes
    // This handles cases where Dashboard might not have loaded data yet
    this.backend.getCourses();
    this.backend.getRegistrations();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  deleteRegistration(registration: RegistrationDto): void {
    if (!registration?.id) {
      console.warn('Cannot delete registration: invalid registration data');
      return;
    }

    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: {
        name: registration.name,
        courseName: registration.course?.name || 'unbekannter Kurs',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.performDelete(registration);
      }
    });
  }

  private performDelete(registration: RegistrationDto): void {
    const registrationId = registration.id;
    
    // Add to deleting set
    const currentDeleting = new Set(this.deletingIds());
    currentDeleting.add(registrationId);
    this.deletingIds.set(currentDeleting);

    this.backend.deleteRegistration(registrationId).subscribe({
      next: () => {
        this.handleDeleteSuccess(registrationId);
      },
      error: (error) => {
        this.handleDeleteError(registrationId, error);
      },
    });
  }

  private handleDeleteSuccess(registrationId: string): void {
    // Remove from deleting set
    const currentDeleting = new Set(this.deletingIds());
    currentDeleting.delete(registrationId);
    this.deletingIds.set(currentDeleting);

    // Remove from store
    const index = this.store.registrations.findIndex((r) => r.id === registrationId);
    if (index !== -1) {
      this.store.registrations.splice(index, 1);
    }

    // Adjust pagination if current page is empty
    this.adjustPaginationAfterDelete();

    // Show success message
    this.backend.showSuccessMessage('Anmeldung erfolgreich gelöscht.');

    // Reload from backend to ensure consistency
    this.backend.getRegistrations();
  }

  private handleDeleteError(registrationId: string, error: unknown): void {
    console.error('Fehler beim Löschen der Anmeldung:', error);
    
    // Remove from deleting set
    const currentDeleting = new Set(this.deletingIds());
    currentDeleting.delete(registrationId);
    this.deletingIds.set(currentDeleting);

    // Show error message
    this.backend.showErrorMessage('Fehler beim Löschen der Anmeldung. Bitte versuchen Sie es erneut.');

    // Reload to ensure consistency
    this.backend.getRegistrations();
  }

  private adjustPaginationAfterDelete(): void {
    const totalAfterDelete = this.store.registrations.length;
    if (totalAfterDelete === 0) {
      this.pageIndex.set(0);
      return;
    }

    const maxPageIndex = Math.ceil(totalAfterDelete / this.pageSize()) - 1;
    if (this.pageIndex() > maxPageIndex) {
      this.pageIndex.set(maxPageIndex);
    }
  }

  isDeleting(registrationId: string): boolean {
    return this.deletingIds().has(registrationId);
  }
}
