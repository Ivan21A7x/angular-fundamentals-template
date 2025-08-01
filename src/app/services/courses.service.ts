import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course, CourseFormPayload } from '@app/features/courses/models/course.model';

const API_BASE = 'http://localhost:4000';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    return this.http.get<{ successful: boolean; result: Course[] }>(`${API_BASE}/courses/all`)
      .pipe(map(response => response.result));
  }

  getCourse(id: string): Observable<Course> {
    return this.http
      .get<{ successful: boolean; result: Course }>(`${API_BASE}/courses/${id}`)
      .pipe(map(response => response.result));
  }


  createCourse(course: CourseFormPayload): Observable<any> {
    return this.http.post(`${API_BASE}/courses/add`, course);
  }

  editCourse(id: string, course: CourseFormPayload): Observable<any> {
    return this.http.put(`${API_BASE}/courses/${id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/courses/${id}`);
  }

  filterCourses(searchTerm: string): Observable<Course[]> {
    return this.http.get<{ successful: boolean; result: Course[] }>(`${API_BASE}/courses/filter?text=${searchTerm}`)
      .pipe(map(response => response.result));
  }

  getAllAuthors(): Observable<any[]> {
    return this.http.get<{ successful: boolean; result: any[] }>(`${API_BASE}/authors/all`)
      .pipe(map(response => response.result));
  }


  getAuthorById(id: string): Observable<any> {
    return this.http.get(`${API_BASE}/authors/${id}`);
  }

  createAuthor(author: any): Observable<any> {
    return this.http.post(`${API_BASE}/authors`, author);
  }
}
