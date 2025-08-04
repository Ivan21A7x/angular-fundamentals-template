import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../courses/models/course.model';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { CoursesService } from '@app/services/courses.service';
import { Subject, takeUntil, filter } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})
export class CourseInfoComponent implements OnInit, OnDestroy {
  course?: Course;
  authorNames: string[] = [];
  private destroy$ = new Subject<void>();
  private courseId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesFacade: CoursesStateFacade,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.coursesFacade.getSingleCourse(this.courseId);

      this.coursesFacade.course$
        .pipe(
          takeUntil(this.destroy$),
          filter((course): course is Course => !!course && course.id === this.courseId)
        )
        .subscribe((course) => {
          console.log('📦 Course from store:', course);
          this.course = course;
          this.resolveAuthorNames(course.authors);
        });
    }
  }

  private resolveAuthorNames(authorIds: string[]): void {
    if (!authorIds?.length) {
      this.authorNames = [];
      return;
    }

    this.coursesService.getAllAuthors().subscribe((authorsList) => {
      this.authorNames = authorIds
        .map((id) => authorsList.find((a) => a.id === id)?.name)
        .filter((name): name is string => !!name);
    });
  }

  onBack(): void {
    this.router.navigate(['/courses']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
