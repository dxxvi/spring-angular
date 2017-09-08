import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class StockComponent implements OnInit {
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
  }

  @Input() set closeBuySellBoxFor(_symbol: string) {
    if (_symbol !== undefined) {
      const a: Array<string> = _symbol.split(' ');
      if (a.length > 0 && a[0] === this.stock.symbol) {
        this.buySellOpen = false;
      }
    }
  }

  @Input() set _stock(stock: StockDO) {
    this.stock = stock;
    if (this.dayChart != null) {
      this.dayChart.series[0].addPoint([Date.UTC(
        stock.updatedAt[0], stock.updatedAt[1], stock.updatedAt[2],
        stock.updatedAt[3], stock.updatedAt[4], stock.updatedAt[5]), stock.price]);
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

  ngOnInit(): void {
    const hc1 = this.el.nativeElement.querySelector('div.highchart.whole-day');
    const hc2 = this.el.nativeElement.querySelector('div.highchart.last-minutes');
    if (hc1 !== undefined) {
      this.dayChart = Highcharts.chart(hc1, {
        credits: { enabled: false },
        plotOptions: {
          area: {
            marker: {
              radius: 1
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
        title: { text: null },
        xAxis: { type: 'datetime' },
        yAxis: { title: { text: null } },
        legend: { enabled: false },
        series: [{
          type: 'area',
          data: []
        }]
      });
    }
    if (hc2 != undefined) {
    }
  }
}
