import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UserModel } from '../../pages/auth/models/user.model';
import { AuthService } from '../../pages/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  /** Controls mobile menu visibility */
  isCollapsed = true;

  private authService = inject(AuthService);

  /** Current authenticated user stream */
  public readonly user$: Observable<UserModel | undefined> = this.authService.currentUser$;

  /** Toggle mobile menu visibility */
  toggleMobileMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  /** Trigger application logout and navigate to login page */
  logout(): void {
    this.authService.logout();
  }
}
