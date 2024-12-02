import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Person {
  idPerson: number;
  name: string;
  surname: string;
  typeDocument: string;
  documentNumber: string;
  typeKinship: string;
  educationIdEducation: number;
  healthIdHealth: number;
  familiaId: number;
  state: string;
}

interface Education {
  gradeBook: string;
  gradeAverage: number;
  fullNotebook: string;
  educationalAssitence: string;
  academicTutorias: string;
  degreeStudy: string;
}

interface Health {
  vaccineSchemes: string;
  vph: string;
  influenza: string;
  deworning: string;
  hemoglobin: string;
}

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  private baseUrl = 'https://friendly-space-orbit-97j76xv54xwxhx54w-8085.app.github.dev/persona';

  constructor(private http: HttpClient) { }

    // Método para listar personas activas
    listPersonsActivo(): Observable<Person[]> {
      const url = `${this.baseUrl}/personas/ListaActivos`; // URL corregida
      return this.http.get<Person[]>(url); // Asegúrate de usar el endpoint correcto
    }

    // Método para listar personas inactivas
    listPersonsInactivo(): Observable<Person[]> {
      const url = `${this.baseUrl}/personas/ListaInactivos`; // URL corregida
      return this.http.get<Person[]>(url); // Asegúrate de usar el endpoint correcto
    }

    registerPerson(personData: any): Observable<any> {
      const url = `${this.baseUrl}/registrar`;
      return this.http.post(url, personData);
    }
    
    
    // Método para Eliminar personas
    inactivatePerson(id: number): Observable<string> {
      const url = `${this.baseUrl}/${id}/inactivar`;
      return this.http.put(url, {}, { responseType: 'text' }); // Cambiar a responseType: 'text'
    }

    // Método para Eliminar personas
    restorePerson(id: number): Observable<string> {
      const url = `${this.baseUrl}/${id}/restore`;
      return this.http.put(url, {}, { responseType: 'text' }); // Cambiar a responseType: 'text'
    }
}
