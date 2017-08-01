import { Component } from '@angular/core';
import { StockDO } from "./model";
import { WebsocketService } from "./websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stocks: Array<StockDO> = [];

  constructor(private wsService: WebsocketService) {
    this.wsService.createObservableSocket('ws://localhost:8080/websocket/quotes').subscribe(
      data => {
        if (data.indexOf('QUOTES: ') === 0) {
          this.stocks = JSON.parse(data.replace('QUOTES: ', ''));
        }
        else if (data.indexOf('GRAPHS: ')) {
          // TODO graphs are ready, change the image urls
        }
      },
      error => console.log(error),
      () => console.log('The observable stream is complete.')
    );
  }

  sendMessageToServer() {
    this.wsService.sendMessage('Go to server ' + new Date());
  }
}
