import { Component } from '@angular/core';
import { QuoteMini } from "./model";
import { WebsocketService } from "./websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  quoteMinis: Array<QuoteMini> = [];

  constructor(private wsService: WebsocketService) {
    this.wsService.createObservableSocket('ws://localhost:8080/websocket/quotes').subscribe(
      data => {
        this.quoteMinis = JSON.parse(data);
      },
      error => console.log(error),
      () => console.log('The observable stream is complete.')
    );
  }

  sendMessageToServer() {
    this.wsService.sendMessage('Go to server ' + new Date());
  }
}
