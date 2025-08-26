import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { StudyModel } from '../models/study.model';

@Injectable({
  providedIn: 'root'
})
export class StudiesService {
  private http = inject(HttpClient);
  private apiUrl = 'api/studies'; // in-memory-web-api endpoint

  getAll(): Observable<StudyModel[]> {
    return this.http.get<StudyModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<StudyModel> {
    return this.http.get<StudyModel>(`${this.apiUrl}/${id}`);
  }
}
