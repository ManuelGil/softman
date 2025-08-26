import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { authGuard } from './pages/auth/guards/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(module => module.AuthModule),
  },
  {
    path: 'user',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/user/user.module').then(module => module.UserModule),
  },
  {
    path: 'studies',
    loadChildren: () =>
      import('./pages/studies/studies.module').then(module => module.StudiesModule),
  },
  { path: '', redirectTo: 'studies/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
