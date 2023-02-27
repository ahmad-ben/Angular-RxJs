import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    const subject = new ReplaySubject();
    console.log(subject);
    let observable$ = subject.asObservable();
    console.log(observable$);
    observable$.subscribe(nextPara => {
      console.log(`From Early Subscription: `, nextPara)
    });
    subject.next(1);
    observable$.subscribe(nextPara => {
      console.log(`From Medium Subscription: `, nextPara)
    });
    subject.next(2);
    subject.next(3);
    observable$.subscribe(nextPara => {
      console.log(`From Late Subscription: `, nextPara)
    });
    subject.complete();
    setTimeout(() => {
      subject.subscribe({
        next: (nextPara) => {
          console.log(`After 10 Seconds From Subject Sub: `, nextPara)
        }
      })
    }, 10000);
  }
}






