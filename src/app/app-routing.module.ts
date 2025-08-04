import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.module').then((m) => m.CoursesModule),
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
