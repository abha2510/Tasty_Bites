import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = 'https://tasty-bites-piji.onrender.com/';
  private authenticated = false;
  private loggedInUser: any = null;

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  signup(email: string, password: string, username: string): Observable<any> {
    const url = `${this.backendUrl}/auth`;
    const body = {
      email,
      password,
      username,
      signup: true
    };

    return this.http.post(url, body).pipe(
      tap((response: any) => {
        // Set the logged-in user in the AuthService
        this.setLoggedInUser(response.user);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.backendUrl}/auth`;
    const body = {
      email,
      password,
      signup: false
    };

    return this.http.post(url, body).pipe(
      tap((response: any) => {
        this.authenticated = true;
        // Set the logged-in user in the AuthService
        this.setLoggedInUser(response.user);
      })
    );
  }

  logout(): void {
    this.authenticated = false;
    this.loggedInUser = null;
  }
}
