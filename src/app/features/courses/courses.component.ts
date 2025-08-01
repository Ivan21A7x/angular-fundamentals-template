import { Component } from '@angular/core';
import { mockedCoursesList } from 'src/app/shared/mocks/mock';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses = mockedCoursesList;
  editable = true;

  onShowCourse(courseId: string) {
    console.log('Show course:', courseId);
  }

  onEditCourse(courseId: string) {
    console.log('Edit course:', courseId);
  }

  onDeleteCourse(courseId: string) {
    console.log('Delete course:', courseId);
    this.courses = this.courses.filter(course => course.id !== courseId);
  }
}
