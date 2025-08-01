import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CourseFormPayload, Course } from '@app/features/courses/models/course.model';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { CoursesService } from '@app/services/courses.service';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  courseId: string | null = null;
  isEditMode: boolean = false;
  availableAuthors: { id: string; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coursesFacade: CoursesStateFacade,
    private coursesService: CoursesService,
    public library: FaIconLibrary
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      author: [''],
    });

    this.courseId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.courseId;

    this.coursesService.getAllAuthors().pipe(take(1)).subscribe((authors) => {
      this.availableAuthors = authors;
    });

    if (this.isEditMode && this.courseId) {
      this.coursesFacade.getSingleCourse(this.courseId);

      this.coursesFacade.course$
        .pipe(
          filter((course): course is Course => !!course && course.id === this.courseId),
          take(1)
        )
        .subscribe((course) => {
          this.courseForm.patchValue({
            title: course.title,
            description: course.description,
            duration: course.duration,
          });

          const authorsArray = this.courseForm.get('authors') as FormArray;
          authorsArray.clear();

          if (Array.isArray(course.authors)) {
            course.authors.forEach((authorId: string) => {
              authorsArray.push(this.fb.control(authorId));
            });
          }
        });
    }
  }

  get title(): AbstractControl | null {
    return this.courseForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.courseForm.get('description');
  }

  get duration(): AbstractControl | null {
    return this.courseForm.get('duration');
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get author(): AbstractControl | null {
    return this.courseForm.get('author');
  }

  addAuthor(): void {
    const selectedId = this.author?.value;
    if (!selectedId) return;

    const alreadyAdded = this.authors.value.includes(selectedId);
    if (!alreadyAdded) {
      this.authors.push(this.fb.control(selectedId));
    }

    this.author?.reset();
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const courseData: CourseFormPayload = {
      title: this.title?.value,
      description: this.description?.value,
      duration: this.duration?.value,
      authors: this.authors.value,
      creationDate: !this.isEditMode ? this.getCurrentFormattedDate() : undefined,
    };

    if (this.isEditMode && this.courseId) {
      this.coursesFacade.editCourse(courseData, this.courseId);
    } else {
      this.coursesFacade.createCourse(courseData);
    }
  }

  getCurrentFormattedDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getAuthorNameById(id: string): string {
    return this.availableAuthors.find((a) => a.id === id)?.name || id;
  }
}
