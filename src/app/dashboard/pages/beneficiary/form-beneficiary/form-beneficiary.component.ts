import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-form-beneficiary',
  templateUrl: './form-beneficiary.component.html',
  styleUrls: ['./form-beneficiary.component.css'],
  standalone: true,
  providers: [BeneficiaryService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class FormBeneficiaryComponent implements OnInit {
  personForm?: FormGroup;
  step = 1;
  formData: any = null;

  constructor(
    private fb: FormBuilder,
    private beneficiaryService: BeneficiaryService,
    private dialogRef: MatDialogRef<FormBeneficiaryComponent>
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // No es necesario hacer nada aquí
  }

  initializeForm(): void {
    this.personForm = this.fb.group({
      name: new FormControl(''),
      surname: new FormControl(''),
      typeDocument: new FormControl(''),
      documentNumber: new FormControl(''),
      typeKinship: new FormControl(''),
      familiaId: new FormControl(null),
    });
  
    // Agregar los grupos de educación y salud después
    this.addEducationGroup();
    this.addHealthGroup();
  
    if (this.formData) {
      this.personForm.patchValue(this.formData);
    }
  }
  
  addEducationGroup(): void {
    this.personForm?.addControl('education', this.fb.group({
      gradeBook: new FormControl(''),
      gradeAverage: new FormControl(''),
      fullNotebook: new FormControl(''),
      educationalAssitence: new FormControl(''),
      academicTutorias: new FormControl(''),
      degreeStudy: new FormControl(''),
    }));
  }
  
  addHealthGroup(): void {
    this.personForm?.addControl('health', this.fb.group({
      vaccineSchemes: new FormControl(''),
      vph: new FormControl(''),
      influenza: new FormControl(''),
      deworning: new FormControl(''),
      hemoglobin: new FormControl(''),
    }));
  }
  
  
  

  nextStep(): void {
    if (this.step < 3 && this.personForm) {
      this.formData = this.personForm.value;
      this.step++;
    }
  }

  previousStep(): void {
    if (this.step > 1 && this.personForm) {
      this.step--;
      this.personForm.patchValue(this.formData);
    }
  }

  submitForm(): void {
    if (this.personForm) {
      const personData = {
        name: this.personForm.value.name,
        surname: this.personForm.value.surname,
        typeDocument: this.personForm.value.typeDocument,
        documentNumber: this.personForm.value.documentNumber,
        typeKinship: this.personForm.value.typeKinship,
        familiaId: this.personForm.value.familiaId,
        education: {
          gradeBook: this.personForm.value.education.gradeBook,
          gradeAverage: this.personForm.value.education.gradeAverage,
          fullNotebook: this.personForm.value.education.fullNotebook,
          educationalAssitence: this.personForm.value.education.educationalAssitence,
          academicTutorias: this.personForm.value.education.academicTutorias,
          degreeStudy: this.personForm.value.education.degreeStudy,
        },
        health: {
          vaccineSchemes: this.personForm.value.health.vaccineSchemes,
          vph: this.personForm.value.health.vph,
          influenza: this.personForm.value.health.influenza,
          deworning: this.personForm.value.health.deworning,
          hemoglobin: this.personForm.value.health.hemoglobin,
        },
      };
  
      this.beneficiaryService.registerPerson(personData).subscribe({
        next: () => {
          console.log('Formulario enviado con éxito');
          this.dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error al registrar la persona:', error);
        },
      });
    }
  }
  

  cancel(): void {
    this.dialogRef.close(false);
  }
}
