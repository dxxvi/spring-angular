import { Component } from '@angular/core';
import { StockDO } from "./model";
import { WebsocketService } from "./websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stocks: Array<StockDO> = [];

  constructor(private wsService: WebsocketService) {
    this.wsService.createObservableSocket('ws://localhost:8080/websocket/quotes').subscribe(
      data => {
        if (data.indexOf('QUOTES: ') === 0) {
          this.stocks = JSON.parse(data.replace('QUOTES: ', ''));
        }
        else if (data.indexOf('GRAPHS: ') === 0) {
          this.stocks.forEach(stock =>
            stock.graphUrl = 'http://localhost:8080/graph/' + stock.symbol + '?' + new Date().getTime());
        }
      },
      error => console.log(error),
      () => console.log('The observable stream is complete.')
    );
  }

  askServerToFetchQuotes() {
    this.wsService.sendMessage('QUOTES:');
  }
}
