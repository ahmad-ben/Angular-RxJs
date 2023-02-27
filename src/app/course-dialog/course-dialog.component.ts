import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Course } from "../model/course";
import { Store } from './../common/store.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;
  course:Course;
  @ViewChild('saveButton', { static: true }) saveButton: MatButton;
  @ViewChild('searchInput', { static: true }) searchInput : ElementRef;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course:Course,
    private store: Store,
  )
  {
    this.course = course;
    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription,Validators.required]
    });
  }
  ngAfterViewInit() {
  }
  save(){
    let subTest = new BehaviorSubject(0);
    console.log(this.course.id);
    console.log(this.form.value);
    this.store.saveCourse(this.course.id, this.form.value)
      .subscribe({
        next: (nextPara) => {
          console.log('Process Complete Good')
          this.close()
        },
        error: (errorPara) => console.log(`Error Saving Course: `, errorPara),
      });
  }
  close() {
    this.dialogRef.close();
  }
}
