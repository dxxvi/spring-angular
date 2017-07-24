import { Component, Input } from '@angular/core';
import { Stock } from "./model";

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
  @Input() stock: Stock;
}
