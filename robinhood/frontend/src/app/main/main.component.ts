import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BuySellOrder, StockDO } from '../model';
import { LogLevel, Message } from '../model2';
import { WebsocketService } from '../websocket.service';
import { ToastData, ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  stocks: Array<StockDO> = [];
  // the same value is sent to all stock components which check if this value is the same as the symbol in that component
  closeBuySellBoxFor: string;
  nosound = true;
  farBackForOrders = 33;
  utilsOpen = false;
  timestamp = 0;
  graphKeepingDuration = 30;  // in minutes
  equity: string;

  // s variables hold the number of shares
  s1 = 0;
  s2 = 0;
  s3 = 0;
  s4 = 0;
  s5 = 0;
  s6 = 0;
  s7 = 0;
  s8 = 0;
  s9 = 0;
  s10 = 0;
  // p variables hold the price (0 means current price, -1 means current price - 1, ...)
  p1 = 0;
  p2 = 0;
  p3 = 0;
  p4 = 0;
  p5 = 0;
  p6 = 0;
  p7 = 0;
  p8 = 0;
  p9 = 0;
  p10 = 0;

  constructor(private wsService: WebsocketService, private http: HttpClient,
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
          this.timestamp = new Date().getTime();
        }
        else if (data.indexOf('ORDERS: ') === 0) {
          const symbolOrdersMap = JSON.parse(data.replace('ORDERS: ', ''));
          this.stocks.forEach(stock => {
            if (stock.orders === null || stock.orders === undefined) {
              stock.orders = symbolOrdersMap[stock.symbol];
            }
            else if (symbolOrdersMap[stock.symbol]) {
              const tempOrders = stock.orders.slice(0);
              symbolOrdersMap[stock.symbol].forEach(order => {
                const i = tempOrders.findIndex(o => o.id === order.id);
                if (i > -1) {
                  if (order.state === 'cancelled') {
                    tempOrders.splice(i, 1);
                  }
                  else {
                    tempOrders[i].state = order.state;
                    tempOrders[i].updatedAt = order.updatedAt;
                  }
                }
                else if (order.state !== 'cancelled') {
                  tempOrders.push(order);
                }
              });
              tempOrders.sort((a, b) => b.createdAtTimestamp - a.createdAtTimestamp);
              stock.orders = tempOrders;
            }

            if (stock.orders) {
              stock.orders.forEach(order => {
                order.justRemoved = false;
                order.justCancelled = false;
              });
            }
          });
        }
        else if (data.indexOf('HIDDEN ORDER IDS: ') === 0) {
          const hiddenOrderIds: Array<string> = JSON.parse(data.replace('HIDDEN ORDER IDS: ', ''));
          this.stocks.forEach(stock => {
            if (stock.orders) {
              hiddenOrderIds.forEach(hiddenOrderId => {
                const i = stock.orders.findIndex(o => o.id === hiddenOrderId);
                if (i >= 0) {
                  stock.orders.splice(i, 1);
                }
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
        else if (data.indexOf('SOUND: ') === 0) {
          this.play(data.replace('SOUND: ', ''));
        }
        else if (data.indexOf('REMOVE SYMBOL: ') === 0) {
          const removedSymbol = data.replace('REMOVE SYMBOL: ', '');
          const i = this.stocks.findIndex(stockDO => stockDO.symbol === removedSymbol);
          if (i >= 0) {
            this.stocks.splice(i, 1);
          }
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
        else if (data.indexOf('ERROR: ') === 0 || data.indexOf('WARNING: ') === 0) {
          const isError: boolean = data.indexOf('ERROR: ') === 0;
          const array = isError ? data.replace('ERROR: ', '').split('|') :
            data.replace('WARNING: ', '').split('|');
          const title = array.length > 1 ? array[0] : (isError ? 'ERROR' : 'WARNING');
          const msg   = array.length > 1 ? array[1] : array[0];
          const fn = isError ? this.toastyService.error : this.toastyService.warning;
          fn({
            title: title,
            msg: msg,
            timeout: 9876
          });
        }
        else if (data.indexOf('PORTFOLIO: ') === 0) {
          this.equity = data.replace(/00$/, '').replace(/^PORTFOLIO: /, '$');
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

  ngOnInit() {
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
        oldStock.updatedAt = stock.updatedAt;
        oldStock.autoRun = stock.autoRun;
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

  private play(word: string) {
    if (!this.nosound) {
      const audio = new Audio();
      audio.src = '/sound/' + word + '.mp3';
      audio.load();
      audio.play();
    }
  }

  private setFarBackForOrders() {
    this.farBackForOrders = parseInt('' + this.farBackForOrders);
    if (isNaN(this.farBackForOrders)) {
      this.farBackForOrders = 8;
    }
    else if (this.farBackForOrders > 960) {
      this.farBackForOrders = 960;
    }
    this.http.get('/utils/far-back-for-orders?farBackForOrders=' + this.farBackForOrders)
      .subscribe(data => {
        console.log(data)
      });
  }

  private clearHiddenOrderIds() {
    this.http.get('/utils/clear-hidden-order-ids')
      .subscribe(data => {
        console.log(data)
      });
  }

  private writeDbToJson() {
    console.log('app.component.ts: writeDbToJson');
    this.http.get('/utils/write-db-to-json')
      .subscribe(data => {
        console.log(data)
      });
  }
}
