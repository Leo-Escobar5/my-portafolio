import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';
  private _isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());

  isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  login(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this._isAuthenticated.next(true);
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this._isAuthenticated.next(false);
  }
}
