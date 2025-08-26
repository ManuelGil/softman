import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentAuth = authService.getCurrentUser();
  if (currentAuth) {
    return true;
  }

  // not logged in so redirect to login page with the return url
  router.navigate(['/auth/login']);
  return false;
};
