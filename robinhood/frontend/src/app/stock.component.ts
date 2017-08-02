import { Component, Input } from '@angular/core';
import { StockDO } from './model';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  @Input() stock: StockDO;
  @Input() graphHeight: string;
}
