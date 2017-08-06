import { Component } from '@angular/core';
import { StockDO } from "./model";
import { LogLevel, Message } from './model2';
import { WebsocketService } from './websocket.service';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stocks: Array<StockDO> = [];
  graphHeight = '20px';

  constructor(private wsService: WebsocketService,
              private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
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
            if (stock.orders) {
              stock.orders.forEach(order => {
                order.justRemoved = false;
                order.justCancelled = false;
              });
            }
          });
        }
        else if (data.indexOf('POSITIONS: ') === 0) {
          const symbolPositionMap = JSON.parse(data.replace('POSITIONS: ', ''));
          this.stocks.forEach(stock => {
            const position = symbolPositionMap[stock.symbol];
            if (position) {
              stock.quantity = position.quantity;
              stock.averageBuyPrice = position.averageBuyPrice;
              stock.heldForSells = position.heldForSells;
            }
          });
        }
      },
      error => console.log(error),
      () => console.log('The observable stream is complete.')
    );

    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-right';
    this.toastyConfig.timeout = 4019;
    this.toastyConfig.showClose = true;
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

  messageHandler(message: Message) {
    const toastOptions: ToastOptions = {
      title: message.title,
      msg: message.detail
    };
    this.toastyService[LogLevel[message.logLevel]](toastOptions);
  }
}
