import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'https://animelegacyapi20240929203941.azurewebsites.net/api/Users';

  constructor(private http: HttpClient) { }

  // Ejemplo de método para obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  // Ejemplo de método para obtener un usuario por ID
  getUserById(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url);
  }

  // Ejemplo de método para crear un nuevo usuario
  createUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.API_URL, userData, { headers });
  }

  // Ejemplo de método para actualizar un usuario por ID
  updateUser(id: string, userData: any): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, userData, { headers });
  }

  // Ejemplo de método para eliminar un usuario por ID
  deleteUser(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<any>(url);
  }

  // Método para realizar el login
  login(email: string, password: string): Observable<any> {
    const url = `${this.API_URL}/login`; // Asegúrate de que esta sea la ruta correcta
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    return this.http.post<any>(url, body, { headers });
  } 
  verifyEmail(token: string): Observable<any> {
    const url = `${this.API_URL}/verify`;
    const params = new HttpParams().set('token', token);
    return this.http.get<any>(url, { params });
  }
  patchUser(id: string, patchDoc: any): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json-patch+json' });
    return this.http.patch<any>(url, patchDoc, { headers });
  }

  registerUser(userData: any) {
    return this.http.post(`${this.API_URL}`, userData);
  }
  
}
