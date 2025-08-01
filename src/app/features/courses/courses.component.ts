import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '@app/features/courses/models/course.model';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { AuthFacade } from '@app/store/auth/auth.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone: false,
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(
    private coursesFacade: CoursesStateFacade,
    private authFacade: AuthFacade,
    private router: Router
  ) {
    console.log('[CoursesComponent] Loaded');
    this.courses$ = this.coursesFacade.allCourses$;
    this.isLoading$ = this.coursesFacade.isAllCoursesLoading$;
    this.isAdmin$ = this.authFacade.isAdmin$;
  }

  ngOnInit(): void {
    this.coursesFacade.getAllCourses();
  }

  onAddCourse(): void {
    this.router.navigate(['/courses/add']);
    console.log('Add course button clicked');
  }

  onSearch(value: string): void {
    this.coursesFacade.getFilteredCourses(value);
  }

  onInputChange(value: string): void {
    if (!value.trim()) {
      this.coursesFacade.getFilteredCourses('');
    }
  }

  onShowCourse(courseId: string): void {
    this.router.navigate(['/courses', courseId]);
  }

  onEditCourse(courseId: string): void {
    this.router.navigate(['/courses/edit', courseId]);
  }

  onDeleteCourse(courseId: string): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesFacade.deleteCourse(courseId);
    }
  }
}
