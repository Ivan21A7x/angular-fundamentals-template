import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;

  constructor(private fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      author: ['', [Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.minLength(2)]],
    });
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
    const authorName = this.author?.value.trim();
    if (authorName && this.author?.valid) {
      this.authors.push(this.fb.control(authorName));
      this.author?.reset();
    }
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
      // lógica de creación o edición del curso
    } else {
      this.courseForm.markAllAsTouched();
    }
  }
}
