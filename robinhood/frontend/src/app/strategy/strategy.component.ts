import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css']
})
export class StrategyComponent implements OnInit {
  authenticationToken: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getAuthenticationToken() {
    this.http.get('/utils/authentication-token').subscribe(
      data => {
        this.authenticationToken = data['token'];
        Observable.interval(9 * 60 * 1000).take(1).subscribe(
          () => {
            this.authenticationToken = null;
          }
        );
      }
    );
  }
}
