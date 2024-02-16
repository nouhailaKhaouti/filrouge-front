import { CanActivateFn } from '@angular/router';

export const tetGuard: CanActivateFn = (route, state) => {
  return true;
};
