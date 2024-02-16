import { Injectable } from '@angular/core';
import type { ResolveFn } from '@angular/router';

Injectable({
    providedIn:'root'
})
export const userResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
