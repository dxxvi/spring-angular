import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BuySellOrder, Order, StockDO } from './model';
import { LogLevel, Message } from './model2';
import { WebsocketService } from './websocket.service';
import * as Highcharts from 'highcharts';
import {Gradient} from "highcharts";
import {start} from "repl";

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  @Input() stock: StockDO;

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
  graphKeepingDuration: number;        // in milliseconds
  @Input() i: number;                  // to get different colors for different stocks
  startAutoRun = false;

  private dayChart: any;
  private minuteChart: any;

  constructor(private wsService: WebsocketService, private el: ElementRef) {
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

    if (this.startAutoRun) {
      this.resell = false;
      this.resellDelta = 0;
      this.wait = false;
    }

    this.buySellOrder.emit({
      symbol: this.stock.symbol,
      instrument: this.stock.instrument,
      price: this.priceToTrade,
      quantity: this.numberOfSharesToTrade,
      side: 'buy',
      resell: this.resell,
      resellDelta: this.resellDelta,
      wait: this.wait,
      startAutoRun: this.startAutoRun
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
      wait: this.wait,
      startAutoRun: false
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

  private hexToRGBA(hex: string|Gradient, opacity: number): string {
    if (typeof hex === 'string') {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return 'rgba(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) +
        ', ' + opacity + ')';
    }
    return 'rgba(255, 255, 255, 0)';
  }
  ngOnInit(): void {
    const colorIndex = this.i % Highcharts.getOptions().colors.length;
    console.log(this.stock.symbol + ' colorIndex: ' + colorIndex);
    const hc1 = this.el.nativeElement.querySelector('div.highchart.whole-day');
    const hc2 = this.el.nativeElement.querySelector('div.highchart.last-minutes');
    if (hc2 != undefined) {
      this.minuteChart = Highcharts.chart(hc2, {
        credits: { enabled: false },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, Highcharts.getOptions().colors[colorIndex]],
                [1, this.hexToRGBA(Highcharts.getOptions().colors[colorIndex], 0)]
              ]
            },
            marker: { radius: 1 },
            lineWidth: 1,
            states: {
              hover: { lineWidth: 1 }
            },
            threshold: null
          }
        },
        title: { text: null },
        xAxis: { type: 'datetime' },
        yAxis: { title: { text: null } },
        legend: { enabled: false },
        series: [{
          type: 'area',
          name: this.stock.symbol,
          color: Highcharts.getOptions().colors[colorIndex],
          data: []
        }]
      });
    }
  }

  @Input() set priceChange(neverUsed: number) {
    const t = Date.UTC(this.stock.updatedAt[0], this.stock.updatedAt[1], this.stock.updatedAt[2],
      this.stock.updatedAt[3], this.stock.updatedAt[4], this.stock.updatedAt[5]);
    if (this.dayChart != null) {
      this.dayChart.series[0].addPoint([t, this.stock.updatedAt[6]]);
    }
    if (this.minuteChart != null) {
      while (true) {
        const series = this.minuteChart.series[0];
        const a = series.data;
        if (a.length > 0 && a[0].x + this.graphKeepingDuration < t) {
          series.removePoint(0, false);
          continue;
        }
        break;
      }
      this.minuteChart.series[0].addPoint([t, this.stock.price]);
    }
  }

  @Input() set _graphKeepingDuration(graphKeepingDuration: number) {
    const a = parseInt('' + graphKeepingDuration);
    if (!isNaN(a)) {
      this.graphKeepingDuration = a * 60 * 1000;
    }
  }
}
