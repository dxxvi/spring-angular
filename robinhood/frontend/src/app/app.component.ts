import { Component } from '@angular/core';
import { StockDO } from "./model";
import { WebsocketService } from "./websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stocks: Array<StockDO> = [];
  graphHeight = '20px';

  constructor(private wsService: WebsocketService) {
    this.wsService.createObservableSocket('ws://localhost:8080/websocket/quotes').subscribe(
      data => {
        if (data.indexOf('QUOTES: ') === 0) {
          const newStocks = JSON.parse(data.replace('QUOTES: ', ''));
          if (this.stocks.length === 0) {
            this.stocks = newStocks;
          }
          else {
            this.update(this.stocks, newStocks);
          }
        }
        else if (data.indexOf('GRAPHS: ') === 0) {
          const newTime = new Date().getTime();
          this.stocks.forEach(stock =>
            stock.graphUrl = 'http://localhost:8080/graph/' + stock.symbol + '?' + newTime);
        }
        else if (data.indexOf('GRAPH HEIGHT: ') === 0) {
          this.graphHeight = data.replace('GRAPH HEIGHT: ', '') + 'px';
        }
        else if (data.indexOf('ORDERS: ') === 0) {
          const symbolOrdersMap = JSON.parse(data.replace('ORDERS: ', ''));
          this.stocks.forEach(stock => {
            stock.orders = symbolOrdersMap[stock.symbol];
          });
        }
      },
      error => console.log(error),
      () => console.log('The observable stream is complete.')
    );
  }

  askServerToFetchQuotes() {
    this.wsService.sendMessage('QUOTES:');
  }

  private update(stocks: Array<StockDO>, newStocks: Array<StockDO>) {
    newStocks.forEach(stock => {
      const oldStock = stocks.find(s => s.symbol === stock.symbol);
      if (oldStock !== undefined) {
        oldStock.dayMin = stock.dayMin;
        oldStock.dayMax = stock.dayMax;
        oldStock.price  = stock.price;
      }
    });
  }
}
