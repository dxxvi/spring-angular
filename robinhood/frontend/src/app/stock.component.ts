import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { BuySellOrder, Order, StockDO } from './model';
import { LogLevel, Message } from './model2';
import { WebsocketService } from './websocket.service';
import * as Highcharts from 'highcharts';
import {Color, Gradient} from "highcharts";

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  @Input() stock: StockDO;
  @Input() graphHeight: string;

  // this message check if we enter the valid numbers when buying or selling. Nothing to do with the server.
  @Output() message: EventEmitter<Message> = new EventEmitter();
  /*
   * Why don't I send a websocket message to the server inside the stock component? Because I want to see a toast on the
   * screen about this buy/sell order.
   */
  @Output() buySellOrder: EventEmitter<BuySellOrder> = new EventEmitter();

  buySellOpen = false;
  numberOfSharesToTrade: number;
  priceToTrade: number;
  resell = false;
  resellDelta: number;
  wait = false;

  private dayChart: any;
  private minuteChart: any;

  constructor(private wsService: WebsocketService, private el: ElementRef) {
    const hc1 = el.nativeElement.querySelector('div.highchart.whole-day');
    const hc2 = el.nativeElement.querySelector('div.highchart.last-minutes');
    if (hc1 !== undefined) {
      const y: Color = Highcharts.getOptions().colors[0];
      const x: Gradient = Highcharts.Color(y);
      this.dayChart = Highcharts.chart(hc1, {
        chart: {
          zoomType: 'x'
        },
        credits: {
          enabled: false
        },
        title: {
          text: null
        },
        subtitle: {
          text: null
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: null
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, y],
                [1, x.setOpacity(0).get('rgba')]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },

        series: [{
          type: 'area',
          data: [
            [Date.UTC(2017, 9, 1, 9, 30, 0), 13.1300],
            [Date.UTC(2017, 9, 1, 9, 30, 5), 13.12],
            [Date.UTC(2017, 9, 1, 9, 30, 10), 13.12],
            [Date.UTC(2017, 9, 1, 9, 30, 14), 13.11],
            [Date.UTC(2017, 9, 1, 9, 30, 17), 13.11],
            [Date.UTC(2017, 9, 1, 9, 30, 22), 13.115],
            [Date.UTC(2017, 9, 1, 9, 30, 28), 13.115],
            [Date.UTC(2017, 9, 1, 9, 30, 31), 13.13],
            [Date.UTC(2017, 9, 1, 9, 30, 35), 13.11],
            [Date.UTC(2017, 9, 1, 9, 30, 39), 13.125],
            [Date.UTC(2017, 9, 1, 9, 30, 42), 13.14],
            [Date.UTC(2017, 9, 1, 9, 30, 48), 13.14],
            [Date.UTC(2017, 9, 1, 9, 30, 52), 13.155],
            [Date.UTC(2017, 9, 1, 9, 30, 55), 13.17],
            [Date.UTC(2017, 9, 1, 9, 31, 1), 13.19],
            [Date.UTC(2017, 9, 1, 9, 31, 4), 13.19],
            [Date.UTC(2017, 9, 1, 9, 31, 8), 13.2],
            [Date.UTC(2017, 9, 1, 9, 31, 14), 13.22],
            [Date.UTC(2017, 9, 1, 9, 31, 19), 13.22],
            [Date.UTC(2017, 9, 1, 9, 31, 22), 13.215],
            [Date.UTC(2017, 9, 1, 9, 31, 26), 13.21],
            [Date.UTC(2017, 9, 1, 9, 31, 31), 13.19],
            [Date.UTC(2017, 9, 1, 9, 31, 35), 13.19],
            [Date.UTC(2017, 9, 1, 9, 31, 39), 13.195],
            [Date.UTC(2017, 9, 1, 9, 31, 45), 13.18],
            [Date.UTC(2017, 9, 1, 9, 31, 48), 13.175]
          ]
        }]
      });
    }
    if (hc2 != undefined) {
      const y: Color = Highcharts.getOptions().colors[0];
      const x: Gradient = Highcharts.Color(y);
      this.minuteChart = Highcharts.chart(hc2, {
        chart: {
          zoomType: 'x'
        },
        credits: {
          enabled: false
        },
        title: {
          text: null
        },
        subtitle: {
          text: null
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: null
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, y],
                [1, x]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },

        series: [{
          type: 'area',
          data: [
            [Date.UTC(2017, 9, 1, 9, 30, 0), 13.1300],
            [Date.UTC(2017, 9, 1, 9, 30, 5), 13.12],
            [Date.UTC(2017, 9, 1, 9, 30, 10), 13.12],
            [Date.UTC(2017, 9, 1, 9, 30, 14), 13.11],
            [Date.UTC(2017, 9, 1, 9, 30, 17), 13.11],
            [Date.UTC(2017, 9, 1, 9, 30, 22), 13.115],
            [Date.UTC(2017, 9, 1, 9, 30, 28), 13.115]
          ]
        }]
      });
    }
  }

  @Input() set closeBuySellBoxFor(_symbol: string) {
    if (_symbol !== undefined) {
      const a: Array<string> = _symbol.split(' ');
      if (a.length > 0 && a[0] === this.stock.symbol) {
        this.buySellOpen = false;
      }
    }
  }

  toggleBuySellOpen() {
    this.buySellOpen = !this.buySellOpen;
    if (this.buySellOpen) {
      this.resell = false;
    }
  }

  buildOrderClass(order: Order): string {
    let styleClasses = 'small order ' + order.side;
    if (order.state === 'confirmed') {
      styleClasses += ' confirmed';
    }
    else if (order.state === 'filled') {
      styleClasses += ' filled';
    }
    else if (order.state === 'patient') {
      styleClasses += ' patient';
    }
    else {
      styleClasses += ' not-confirmed';
    }

    return styleClasses;
  }

  buy() {
    const u = this.checkBeforeBuy();
    if (u !== null) {
      this.message.emit(u);
      return;
    }

    this.buySellOrder.emit({
      symbol: this.stock.symbol,
      instrument: this.stock.instrument,
      price: this.priceToTrade,
      quantity: this.numberOfSharesToTrade,
      side: 'buy',
      resell: this.resell,
      resellDelta: this.resellDelta,
      wait: this.wait
    });
  }

  sell() {
    const u = this.checkBeforeSell();
    if (u !== null) {
      this.message.emit(u);
      return;
    }

    this.buySellOrder.emit({
      symbol: this.stock.symbol,
      instrument: this.stock.instrument,
      price: this.priceToTrade,
      quantity: this.numberOfSharesToTrade,
      side: 'sell',
      resell: this.resell,
      resellDelta: this.resellDelta,
      wait: this.wait
    });
  }

  hide(order: Order) {
    order.justRemoved = true;
    this.wsService.sendMessage('HIDE ORDER: ' + order.id);
  }

  cancel(order: Order) {
    order.justCancelled = true;
    this.wsService.sendMessage('CANCEL ORDER: ' + JSON.stringify({
      id: order.id,
      quantity: order.quantity,
      price: order.price,
      side: order.side,
      symbol: this.stock.symbol,
      state: order.state
    }));
  }

  private check(): Message {
    this.numberOfSharesToTrade = parseInt('' + this.numberOfSharesToTrade);
    if (!Number.isInteger(this.numberOfSharesToTrade)) {
      return {
        logLevel: LogLevel.error,
        title: 'Invalid Arguments',
        detail: 'Number of shares to trade is not an integer'
      };
    }
    if (this.numberOfSharesToTrade <= 0) {
      return {
        logLevel: LogLevel.error,
        title: 'Invalid Arguments',
        detail: 'Number of shares to trade must > 0'
      };
    }

    this.priceToTrade = parseFloat('' + this.priceToTrade);
    if (isNaN(this.priceToTrade)) {
      return {
        logLevel: LogLevel.error,
        title: 'Invalid Arguments',
        detail: 'Price to trade is not a number.'
      };
    }
    else if (this.priceToTrade <= 0) {
      return {
        logLevel: LogLevel.error,
        title: 'Invalid Arguments',
        detail: 'Price to trade cannot be negative.'
      };
    }

    if (this.resell) {
      this.resellDelta = parseFloat('' + this.resellDelta);
      if (isNaN(this.resellDelta) || this.resellDelta <= 0) {
        return {
          logLevel: LogLevel.error,
          title: 'Invalid Arguments',
          detail: 'resellDelta is not a number or <= 0'
        };
      }
    }

    return null;
  }

  private checkBeforeBuy(): Message {
    const u = this.check();
    if (u !== null) {
      return u;
    }

    if (this.priceToTrade > this.stock.price) {
      return {
        logLevel: LogLevel.error,
        title: 'Your mistake',
        detail: 'Price to buy ' + this.priceToTrade + ' > current price ' + this.stock.price
      };
    }

    return null;
  }

  private checkBeforeSell(): Message {
    const u = this.check();
    if (u !== null) {
      return u;
    }

    if (this.priceToTrade < this.stock.price) {
      return {
        logLevel: LogLevel.error,
        title: 'Your mistake',
        detail: 'Price to sell ' + this.priceToTrade + ' < current price ' + this.stock.price
      };
    }

    return null;
  }

  isGoingOneWayLongEnough(duration: number): string {
    return duration < 15 ? 'none' : 'inline';
  }
}
