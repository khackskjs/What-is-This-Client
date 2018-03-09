import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mapTo';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-test-angular-study',
  template: `
    <button (click)="click$.next()">Click</button>
    <h3>{{ clock | async | date: 'yy-MMMM-dd h:m:s' }}</h3>
  `,
  styles: ['']
})
export class TestAngularStudyComponent implements OnInit {
  click$ = new Subject();
  clock: Observable<any>;

  constructor(store: Store<any>) {

    this.clock = store.pipe(select('reducer'));

    Observable.merge(
      this.click$.mapTo('hour'),
      Observable.interval(1000).mapTo('second')
    )
      .subscribe((type) => store.dispatch({type}))
  }

  ngOnInit() {
  }

}
