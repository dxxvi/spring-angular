import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BuySellOrder, Order, StockDO } from './model';
import { LogLevel, Message } from './model2';
import { WebsocketService } from './websocket.service';

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

  constructor(private wsService: WebsocketService) {
  }

  @Input()
  set closeBuySellBoxFor(symbol: string) {
    if (symbol === this.stock.symbol) {
      this.buySellOpen = false;
    }
  }

  toggleBuySellOpen() {
    this.buySellOpen = !this.buySellOpen;
  }

  buildOrderClass(order: Order): string {
    let styleClasses = 'small order ' + order.side;
    if (order.state === 'confirmed') {
      styleClasses += ' confirmed';
    }
    else if (order.state === 'filled') {
      styleClasses += ' filled';
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
      side: 'buy'
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
      side: 'sell'
    });
  }

  hide(order: Order) {
    order.justRemoved = true;
    this.wsService.sendMessage('HIDE ORDER: ' + order.id);
  }

  cancel(order: Order) {
    order.justCancelled = true;
    this.wsService.sendMessage('CANCEL ORDER: ' + order.id);
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
}
