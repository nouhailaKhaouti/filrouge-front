import { CanActivateFn } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = '/dashboard';

    return false;
  }
  else {
    return true;
  }
};
