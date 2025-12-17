import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  name: string;
  courseName: string;
}

@Component({
  selector: 'app-delete-confirmation-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Anmeldung löschen?</h2>
    <mat-dialog-content>
      <p>
        Möchten Sie die Anmeldung von <strong>{{ data.name }}</strong> für den Kurs
        <strong>{{ data.courseName }}</strong> wirklich löschen?
      </p>
      <p class="warning-text">Diese Aktion kann nicht rückgängig gemacht werden.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Abbrechen</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Löschen</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        padding: 20px 24px;
      }
      p {
        margin: 10px 0;
        line-height: 1.6;
      }
      .warning-text {
        color: #d32f2f;
        font-weight: 500;
        margin-top: 15px;
      }
      mat-dialog-actions {
        padding: 8px 24px 16px;
      }
    `,
  ],
})
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}


