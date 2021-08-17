import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UsersGuard } from './guards/users.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'profs',
    loadChildren: () => import('./profs/profs.module').then(m => m.ProfsModule)
  },
  {
    path: 'admins',
    loadChildren: () =>
      import('./admins/admins.module').then(m => m.AdminsModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then(m => m.TestModule)
  },
  {
    path: 'tryout',
    loadChildren: () =>
      import('./tryout/tryout.module').then(m => m.TryoutModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
