import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { StockComponent } from './stock.component';
import { WebsocketService } from './websocket.service';
import { ToastyModule } from 'ng2-toasty';
import { StrategyComponent } from './strategy/strategy.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    StrategyComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/main', pathMatch: 'full' },
      { path: 'main',     component: MainComponent },
      { path: 'strategy', component: StrategyComponent }
    ]),
    ToastyModule.forRoot(),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
