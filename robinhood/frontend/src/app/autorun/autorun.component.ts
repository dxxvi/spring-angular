import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autorun',
  templateUrl: './autorun.component.html',
  styleUrls: ['./autorun.component.css']
})
export class AutorunComponent implements OnInit {
  d = [0, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01];
  // s variables hold the number of shares
  s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // p variables hold the price (0 means current price, -0.01 means current price - 0.01, ...)
  p = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor() { }

  ngOnInit() {
  }

  calculateNumbersOfShares() {
    for (let i = 1; i < this.s.length; i++) {
      if (this.p[i] >= this.p[i-1]) {
        for (let j = i; j < this.s.length; j++) {
          this.s[j] = 0;
          this.p[j] = 0;
        }
        return;
      }
      this.s[i] = Math.round(100 * (this.calculateCost(i) - (this.p[i] + this.d[i])*this.calculateShares(i)) + 0.01);
    }
  }

  private calculateCost(k: number): number {
    let result = 0;
    for (let i = 0; i < k; i++) {
      result += this.s[i] * this.p[i];
    }
    return result;
  }
  private calculateShares(k: number): number {
    let result = 0;
    for (let i = 0; i < k; i++) {
      result += this.s[i];
    }
    return result;
  }
}
