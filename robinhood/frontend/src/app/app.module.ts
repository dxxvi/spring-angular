import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotificationComponent } from './notification.component';
import { StockComponent } from './stock.component';
import { WebsocketService } from './websocket.service';
import { ToastyModule } from 'ng2-toasty';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ToastyModule.forRoot()
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
