import { Component } from '@angular/core';
import { BuySellOrder, StockDO } from './model';
import { LogLevel, Message } from './model2';
import { WebsocketService } from './websocket.service';
import { ToastData, ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stocks: Array<StockDO> = [];
  graphHeight = '20px';
  // the same value is sent to all stock components which will if this value is the same as the symbol in that component
  closeBuySellBoxFor: string;

  constructor(private wsService: WebsocketService,
              private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    const url = new URL(location.href);

    this.wsService.createObservableSocket('ws://' + url.hostname + ':' + url.port + '/websocket/quotes').subscribe(
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
            stock.graphUrl = '/graph/' + stock.symbol + '?' + newTime);
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
        else if (data.indexOf('NEW ORDER: ') === 0) {
          const newOrder = JSON.parse(data.replace('NEW ORDER: ', ''));
          const stock = this.stocks.find(stock => stock.symbol === newOrder.symbol);
          if (stock !== undefined) {
            newOrder.justRemoved = false;
            newOrder.justCancelled = false;
            if (stock.orders === undefined) {
              stock.orders = [newOrder];
            }
            else {
              stock.orders.push(newOrder);
            }
          }
          else {
            this.toastyService.error({
              title: 'Unable to find a stock for this new order',
              msg: data.replace('NEW ORDER: ', '')
            });
          }
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
        else if (data.indexOf('BUY SELL: ') === 0) {
          const buySellOrder: BuySellOrder = JSON.parse(data.replace('BUY SELL: ', ''));
          const toastOptions: ToastOptions = {
            title: 'Successfully sent an order to Robinhood',
            msg: buySellOrder.side + ' ' + buySellOrder.quantity + ' ' + buySellOrder.symbol + ' shares @ $' +
                 buySellOrder.price + ' each.'
          };
          this.toastyService.success(toastOptions);
        }
        else if (data.indexOf('CANCELLED ORDER: ') === 0) {
          this.toastyService.info({
            title: "CANCELLED ORDER",
            msg: data.replace('CANCELLED ORDER: ', '')
          });
        }
        else if (data.indexOf('FIX ME: ') === 0) {
          const array = data.split('|');
          const title = array.length > 1 ? array[0] : 'FiX ME in app.component.ts';
          const msg   = array.length > 1 ? array[1] : array[0].replace('FIX ME: ', '');
          this.toastyService.error({
            title: title,
            msg: msg,
            timeout: 9876
          });
        }
      },
      error => {
        console.log('Error channel:');
        console.log(error);
        const toastOptions: ToastOptions = {
          title: 'You need to reload the page',
          msg: '',
          timeout: 9999999
        };
        this.toastyService.error(toastOptions);
      },
      () => console.log('The observable stream is complete.')
    );

    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-right';
    this.toastyConfig.timeout = 6789;
    this.toastyConfig.showClose = true;
  }

  private update(stocks: Array<StockDO>, newStocks: Array<StockDO>) {
    newStocks.forEach(stock => {
      const oldStock = stocks.find(s => s.symbol === stock.symbol);
      if (oldStock !== undefined) {
        oldStock.dayMin = stock.dayMin;
        oldStock.dayMax = stock.dayMax;
        oldStock.price  = stock.price;
        oldStock.weekPercentage = stock.weekPercentage;
        oldStock.dayPercentage  = stock.dayPercentage;
        oldStock.last5minsMin = stock.last5minsMin;
        oldStock.last5minsMax = stock.last5minsMax;
        oldStock.down = stock.down;
        oldStock.up   = stock.up;
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

  buySellOrderHandler(buySellOrder: BuySellOrder) {
    const that = this;
    const toastOptions: ToastOptions = {
      title: buySellOrder.side === 'buy' ? 'Buy' : 'Sell',
      msg: buySellOrder.quantity + ' ' + buySellOrder.symbol + ' shares @ $' + buySellOrder.price + ' each. Total: $' +
           buySellOrder.quantity * buySellOrder.price + '.',
      onRemove: function(toast: ToastData) {
        // if this string doesn't change every time, the stock component cannot be notified
        that.closeBuySellBoxFor = buySellOrder.symbol + ' ' + new Date().getTime();
      }
    };
    this.toastyService.info(toastOptions);

    this.wsService.sendMessage('BUY SELL: ' + JSON.stringify(buySellOrder));
  }
}
