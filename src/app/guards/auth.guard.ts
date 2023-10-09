import {inject} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService} from "../auth/auth.service";

/**
 * This guard checks if current user is authenticated before routing.
 */
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect to the login page if not authenticated
  return router.parseUrl('/login');
};
