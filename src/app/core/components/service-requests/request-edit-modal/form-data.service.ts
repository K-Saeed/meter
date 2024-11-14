// form-data.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor(private http: HttpClient) {}

  updateRequest(data: any): Observable<any> {  // Add the Observable return type here
    return this.http.post('/api/updateRequest', data); // Return the Observable
  }

  private selectedFormType = new BehaviorSubject<string | null>(null);
  private formData = {
    form1: null,
    form2: null,
    form3: null,
  };

  // Observable to track selected form type
  selectedFormType$ = this.selectedFormType.asObservable();

  // Update the selected form type
  setSelectedFormType(type: string) {
    this.selectedFormType.next(type);
  }

  // Set form data for a specific form
  setFormData(formId: number, data: any) {
    if (formId === 1) {
      this.formData.form1 = data;
    } else if (formId === 2) {
      this.formData.form2 = data;
    } else if (formId === 3) {
      this.formData.form3 = data;
    }
  }

  // Submit all forms
  submitForms() {
    const combinedData = {
      form1: this.formData.form1,
      form2: this.formData.form2,
      form3: this.formData.form3,
    };
    console.log('Combined form data: ', combinedData);
    return combinedData;
  }
}
