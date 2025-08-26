import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Storage key for persisted auth user (sanitized). */
  private static readonly AUTH_STORAGE_KEY: string = 'auth';
  /** API endpoint for users collection. */
  private static readonly API_USERS_ENDPOINT: string = 'api/users';

  private http = inject(HttpClient);
  private router = inject(Router);

  /**
   * Centralized authenticated user state.
   * The stored user is sanitized (no real password; password stored as empty string).
   */
  private readonly currentUserSubject: BehaviorSubject<UserModel | undefined> = new BehaviorSubject<UserModel | undefined>(this.readUserFromStorage());

  /** Observable of the current authenticated user. */
  public readonly currentUser$: Observable<UserModel | undefined> = this.currentUserSubject.asObservable();

  // public methods
  getCurrentUser(): UserModel | undefined {
    return this.currentUserSubject.value;
  }

  login(document: string, password: string): Observable<UserModel | undefined> {
    return this.http.get<UserModel[]>(AuthService.API_USERS_ENDPOINT).pipe(
      map((result: UserModel[]) => {
        if (!result || result.length <= 0) {
          return undefined;
        }

        const auth = result.find(user => {
          const documentMatch = user.document.toLowerCase() === document.toLowerCase();
          const passwordMatch = user.password === password;
          return documentMatch && passwordMatch;
        });

        if (!auth) {
          return undefined;
        }

        this.setCurrentUser(auth);

        return auth;
      }),
      catchError((error) => {
        return of(undefined);
      }),
    );
  }

  logout() {
    this.clearCurrentUser();
    this.router.navigate(['/auth/login']);
  }

  // private methods
  /** Persist sanitized user and update state. */
  private setCurrentUser(user: UserModel): void {
    const sanitized: UserModel = { ...user, password: '' };
    this.writeUserToStorage(sanitized);
    this.currentUserSubject.next(sanitized);
  }

  /** Clear persisted user and state. */
  private clearCurrentUser(): void {
    localStorage.removeItem(AuthService.AUTH_STORAGE_KEY);
    this.currentUserSubject.next(undefined);
  }

  /** Read sanitized user from storage. */
  private readUserFromStorage(): UserModel | undefined {
    try {
      const raw = localStorage.getItem(AuthService.AUTH_STORAGE_KEY);
      if (!raw) {
        return undefined;
      }
      const parsed: UserModel = JSON.parse(raw);
      return parsed ?? undefined;
    } catch {
      return undefined;
    }
  }

  /** Write sanitized user to storage. */
  private writeUserToStorage(user: UserModel): void {
    localStorage.setItem(AuthService.AUTH_STORAGE_KEY, JSON.stringify(user));
  }
}

