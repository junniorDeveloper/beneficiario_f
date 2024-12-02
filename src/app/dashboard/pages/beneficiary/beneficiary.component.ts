import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BeneficiaryService } from '../services/beneficiary.service';
import { FormBeneficiaryComponent } from '../beneficiary/form-beneficiary/form-beneficiary.component'; // Importa el componente del formulario

@Component({
  selector: 'app-beneficiary',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
  ],
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css'],
})
export class BeneficiaryComponent implements OnInit {
  persons: any[] = []; // Almacena los datos de la API
  displayedColumns: string[] = [
    'name',
    'surname',
    'typeDocument',
    'documentNumber',
    'actions',
  ];
  showingActive: boolean = true;

  constructor(
    private beneficiaryService: BeneficiaryService,
    private dialog: MatDialog // Agrega el servicio MatDialog para manejar los modales
  ) {}

  ngOnInit(): void {
    this.loadPersons(); // Cargar personas activas al inicializar
  }

  // Método para alternar entre activos e inactivos
  togglePersons(): void {
    this.showingActive = !this.showingActive; // Cambiar el estado
    this.loadPersons(); // Recargar los datos según el estado
  }

  // Cargar personas activas o inactivas
  loadPersons(): void {
    const service = this.showingActive
      ? this.beneficiaryService.listPersonsActivo()
      : this.beneficiaryService.listPersonsInactivo();

    service.subscribe({
      next: (data) => {
        this.persons = data;
        console.log('Personas cargadas:', this.persons); // Log para verificar
      },
      error: (err) => {
        console.error('Error al cargar personas:', err);
        Swal.fire('Error', 'No se pudieron cargar las personas.', 'error');
      },
    });
  }

  // Alternar entre eliminar y restaurar
  togglePersonState(id: number, state: string): void {
    const isActive = state === 'A';
    const action = isActive ? 'inactivar' : 'restaurar';

    Swal.fire({
      title: `¿Estás seguro de que deseas ${isActive ? 'eliminar' : 'restaurar'}?`,
      text: isActive
        ? '¡No podrás revertir esta acción!'
        : 'La persona será restaurada.',
      icon: isActive ? 'warning' : 'info',
      showCancelButton: true,
      confirmButtonColor: isActive ? '#d33' : '#3085d6',
      cancelButtonColor: '#aaa',
      confirmButtonText: `Sí, ${isActive ? 'eliminar' : 'restaurar'}`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const service = isActive
          ? this.beneficiaryService.inactivatePerson(id)
          : this.beneficiaryService.restorePerson(id);

        service.subscribe({
          next: () => {
            Swal.fire(
              `${isActive ? 'Eliminado' : 'Restaurado'}!`,
              `La persona ha sido ${isActive ? 'eliminada' : 'restaurada'} exitosamente.`,
              'success'
            );

            // Actualizar la lista de personas para reflejar el cambio de estado
            this.loadPersons();
          },
          error: (err) => {
            console.error(`Error al ${action} la persona:`, err);
            Swal.fire(
              'Error',
              `Hubo un problema al ${action} la persona.`,
              'error'
            );
          },
        });
      }
    });
  }

  // Método para abrir el formulario modal
  openFormBeneficiary(): void {
    const dialogRef = this.dialog.open(FormBeneficiaryComponent, {
      width: '600px', // Ajusta el tamaño del modal
      disableClose: true, // Evita cerrar al hacer clic fuera del modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Formulario enviado:', result);
        // Puedes agregar lógica para guardar o actualizar los datos
        this.loadPersons(); // Opcional: refresca la lista de personas después de agregar
      }
    });
  }
}
