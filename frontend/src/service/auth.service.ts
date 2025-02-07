import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${process.env['API_BASE_URL']}/auth/login`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(this.apiUrl, payload);
  }
}
