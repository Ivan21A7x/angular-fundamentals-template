import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './courses-list/courses-list.component';
import { CourseCardComponent } from '@app/shared/components';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesComponent, CourseListComponent],
  imports: [CommonModule, SharedModule, CoursesRoutingModule],
  exports: [CoursesComponent, CourseListComponent, ],
})
export class CoursesModule {}
