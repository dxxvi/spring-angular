import { Component, Input } from '@angular/core';
import {Order, StockDO} from './model';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  @Input() stock: StockDO;
  @Input() graphHeight: string;

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
}
