import { Component } from '@angular/core';
import {Stock} from "./model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stocks: Array<Stock> = [];

  constructor() {
    setInterval(() => {
      this.stocks = [
        { symbol: 'AMD', price: Math.random()*2 + 13 },
        { symbol: 'INTC', price: Math.random()*3 + 33 }
      ];
      if (Math.random() > 0.5) {
        this.stocks.push({ symbol: 'ON', price: Math.random()*2 + 14});
      }
    }, 1904);
  }
}
