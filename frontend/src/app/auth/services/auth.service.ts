import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  baseURL: string = `${environment.apiBaseUrl}/auth`;

 currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
 currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    const storeUser = localStorage.getItem('user');
    if (storeUser) {
      this.currentUserSubject.next(JSON.parse(storeUser));
    }
   }

  register(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/register`, { email })
      .pipe(
        tap((response: AuthResponse) => {
          this.handleAuthResponse(response);
        }));
  }

  login(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, { email })
      .pipe(
        tap((response: AuthResponse) => {
          this.handleAuthResponse(response);
        }));
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
