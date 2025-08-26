import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UserModel } from './pages/auth/models/user.model';
import { AuthService } from './pages/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Lumier Digital RIS - PACS';

  private authService = inject(AuthService);

  /** Observable stream of the current authenticated user */
  get user$(): Observable<UserModel | undefined> {
    const currentUser = this.authService.getCurrentUser();
    return of(currentUser);
  }
}
