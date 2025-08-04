import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './courses-list/courses-list.component';

@NgModule({
  declarations: [CoursesComponent, CourseListComponent],
  imports: [CommonModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
