import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private apiUrl = 'http://localhost:3000';
  public endpoint: string;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${this.endpoint}`);
  }

  getById(item: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.endpoint}/${item.id}`);
  }

  add(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.endpoint}`, item);
  }

  update(item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${this.endpoint}/${item.id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }
}
