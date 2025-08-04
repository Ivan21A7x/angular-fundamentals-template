import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from '@app/shared/components';
import { CourseInfoComponent } from '../course-info/course-info.component';

const routes: Routes = [
  { path: '', component: CoursesComponent, },
  { path: 'add', component: CourseFormComponent },
  { path: 'edit/:id', component: CourseFormComponent }, 
  { path: ':id', component: CourseInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
