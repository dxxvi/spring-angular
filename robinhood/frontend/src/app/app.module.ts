import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotificationComponent } from './notification.component';
import { StockComponent } from './stock.component';
import { WebsocketService } from './websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    StockComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
