import { CanActivateFn } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = '/dashboard';
    return true;
  }
  else {
    
    return false;
  }
};
