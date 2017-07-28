import { Component, Input } from '@angular/core';
import { QuoteMini } from './model';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
  @Input() quote: QuoteMini;
}
