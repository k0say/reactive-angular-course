import { tap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { map } from 'rxjs/internal/operators/map';
import { Lesson } from '../model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  loadAllCourses(): Observable<Course[]>  {
    return this.http.get<Course[]>("/api/courses")
      .pipe(
        map(res => res["payload"]),
        shareReplay()
      );
  }

  loadCourseById(courseId: number)  {
    return this.http.get<Course>(`/api/courses/${courseId}`).pipe(
      shareReplay()
    )
  }

  loadAllCourseLessons(courseId: number): Observable<Lesson[]>  {
    return this.http.get<Lesson[]>('/api/lessons', {
      params: {
        pageSize: "10000",
        courseId: courseId.toString()
      }
    }).pipe(
      map(res => res["payload"]),
      shareReplay()
    );
  }
  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      shareReplay()
    );
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons', {
      params: {
        filter: search,
        pageSize: "100"
      }
    }).pipe(
      map(res => res["payload"]),
      shareReplay()
    );
  }

}