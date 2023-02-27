import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../common/store.service';
import { Course } from "../model/course";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store){}
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  ngOnInit() {
    const courses$ = this.store.courses$;
    this.beginnerCourses$ = this.store.getBigenerCourses();
    this.advancedCourses$ = this.store.getAdvancedCourses();
  }
}
