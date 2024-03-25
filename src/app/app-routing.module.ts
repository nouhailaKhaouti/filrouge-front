import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { authGuard } from './guards/auth.guard';
import AuthSigninComponent from './demo/pages/authentication/auth-signin/auth-signin.component';
import { MembersComponent } from './demo/members/members.component';
import { CreateConcourComponent } from './demo/create-concour/create-concour.component';
import { FullCalendarComponent } from './demo/full-calendar/full-calendar.component';
import { ConcoursComponent } from './demo/concours/concours.component';
import { DepartementComponent } from './demo/departement/departement.component';
import { FiliereComponent } from './demo/filiere/filiere.component';
import { NiveauComponent } from './demo/niveau/niveau.component';
import { InscriptionComponent } from './demo/inscription/inscription.component';
import { InscriptionListComponent } from './demo/inscription-list/inscription-list.component';
import { ConcoursListComponent } from './demo/concours-list/concours-list.component';
import { roleGuard } from './guards/role.guard';
import { notAuthGuard } from './guards/not-auth.guard';

const routes: Routes = [
  {
    path: '',component:AuthSigninComponent,
    pathMatch: 'full',

  },  

  {
    path: 'levels',
    component: NiveauComponent

  },  
  {
    path: 'subscription/:niveau',
    component: InscriptionComponent

  },  
  {
    path: '',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        canActivate: [roleGuard], data: { role: ['MANAGER','PROF'] }
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component'),
        canActivate: [roleGuard], data: { role: ['MANAGER','PROF'] }
      },
      {
        path: 'inscription_List',
        component:InscriptionListComponent,
        canActivate: [roleGuard], data: { role: ['MANAGER','PROF'] }
      },
      {
        path: 'concours_List',
        component:ConcoursListComponent,
        canActivate: [roleGuard], data: { role: ['MANAGER','PROF'] }
      },
      {
        path: 'members',
        component:MembersComponent,
        canActivate: [roleGuard], data: { role: ['MANAGER'] }
      },
      {
        path: 'concours',
        component:ConcoursComponent,
        canActivate: [roleGuard], data: { role: ['MANAGER','PROF'] }
      },
      {
        path: 'ExamsCalendar',
        component:FullCalendarComponent,
        canActivate: [roleGuard], data: { role: ['MANAGER','PROF'] }
      },
      {
        path: 'CreateConcour',
        component:CreateConcourComponent,
        canActivate: [roleGuard], data: { role: ['MANAGER','PROF'] }
      },
      {
        path: 'departement',
        component:DepartementComponent,
        canActivate: [roleGuard], data: { role: ['MANAGER'] }
      },
      {
        path: 'field',
        component:FiliereComponent,
        canActivate: [roleGuard], data: { role: ['MANAGER'] }

      },
      {
        path: 'basic',
        loadChildren: () =>
          import('./demo/ui-elements/ui-basic/ui-basic.module').then(
            (m) => m.UiBasicModule,
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./demo/pages/form-elements/form-elements.module').then(
            (m) => m.FormElementsModule,
          ),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./demo/pages/tables/tables.module').then(
            (m) => m.TablesModule,
          ),
      },
      {
        path: 'apexchart',
        loadComponent: () =>
          import('./demo/chart/apex-chart/apex-chart.component'),
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./demo/extra/sample-page/sample-page.component'),
      },
    ],
  },
  {
    path: '',
    component: GuestComponent,
    canActivate: [notAuthGuard],
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
