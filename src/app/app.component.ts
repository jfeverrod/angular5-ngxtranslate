import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

const DOGS_KEY = makeStateKey('dogs');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'app';

  dogs: any;

  constructor(
    private http: HttpClient,
    private state: TransferState,
    private _translateService: TranslateService
  ) {
    this._translateService.use('es');
  }

  ngOnInit() {
    this.dogs = this.state.get(DOGS_KEY, null as any);
    if (!this.dogs) {
      this.http
        .get('https://dog.ceo/api/breeds/list/all')
        .subscribe(data => {
          this.dogs = data;
          this.state.set(DOGS_KEY, data as any);
        });
    }
  }
}
