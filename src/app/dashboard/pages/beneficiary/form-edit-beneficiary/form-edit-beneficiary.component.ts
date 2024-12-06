import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-edit-beneficiary',
  templateUrl: './form-edit-beneficiary.component.html',
  styleUrls: ['./form-edit-beneficiary.component.css'],
  standalone: true,
  providers: [BeneficiaryService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class FormEditBeneficiaryComponent {
  personForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormEditBeneficiaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private beneficiaryService: BeneficiaryService
  ) {
    this.personForm = new FormGroup({
      name: new FormControl(data.name, Validators.required),
      surname: new FormControl(data.surname, Validators.required),
      typeDocument: new FormControl(data.typeDocument, Validators.required),
      documentNumber: new FormControl(data.documentNumber, Validators.required),
      typeKinship: new FormControl(data.typeKinship, Validators.required),
      educationIdEducation: new FormControl(data.educationIdEducation, Validators.required),
      healthIdHealth: new FormControl(data.healthIdHealth, Validators.required),
      familiaId: new FormControl(data.familiaId, Validators.required),
      
    });
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      this.beneficiaryService.updatePerson(this.data.idPerson, this.personForm.value).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Datos actualizados correctamente', 'success');
          this.dialogRef.close(true); 
        },
        error: (err) => {
          Swal.fire('Error', 'Hubo un error al actualizar los datos', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Por favor complete todos los campos', 'warning');
    }
  }

  onCancel(): void {
    this.dialogRef.close(); 
}

}