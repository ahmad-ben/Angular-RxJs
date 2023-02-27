import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Course } from '../model/course';
import { createHttpObservable } from "./util";

@Injectable({
  providedIn: 'root',
})
export class Store{
  private subject= new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();
  init() {
    const http$ = createHttpObservable('/api/courses');
    http$
    .pipe(
      // tap(() => console.log("HTTP request executed")),
      map<Course, Course[]>(res => Object.values(res["payload"]) ),
      ).subscribe({
        next: (nextPara) => {
          this.subject.next(nextPara)
        },
      })
    };
  getCourses(category: string){
      return this.courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category == category)
        )
      );
    }
    getBigenerCourses(){
      return this.getCourses('BEGINNER');
    }
    getAdvancedCourses(){
      return this.getCourses('ADVANCED');
    }
    selectCourseById(courseId: number): Observable<Course> {
      return this.courses$
      .pipe(
        map(courses => courses
          .find(course => {
            return course.id == courseId
          })
        )
      );
    }
  saveCourse(courseId: number, change: any) : Observable<any> {
    // console.log(change);
    const courses = this.subject.getValue();
    // console.log(this.subject.getValue())
    this.subject.subscribe(console.log)
    const courseIndex = courses.findIndex(course => {
      // console.log(course);
      // console.log(course.id);
      // console.log(courseId);
      return course.id === courseId
    });
    const newCourses = courses.slice();
    // console.log(courses[courseIndex]);
    // console.log(change);
    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...change
    }
    this.subject.next(newCourses);
    // console.log(this.subject.getValue())
    return from(fetch(`/api/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(change),
      headers: {
        'content-type': 'application/json'
      }
    }))
  }
}
