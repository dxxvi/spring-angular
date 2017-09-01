webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "div.notification {\n  margin: .1em .1em 1em .1em;\n  background: #f4f4f4;\n  border-radius: .5em;\n  padding: .5em .8em;\n}\n\ntable.stock > tbody > tr:not(:last-child) {\n  border-bottom: 1px solid #ccc;\n}\n\ntable.stock > tbody > tr td.symbol {\n  border-right: 1px solid #ccc;\n  padding-right: .5em;\n}\n\ndiv.container-fluid { padding-left: 5px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div *ngFor=\"let stock of stocks\">\n      <stock [stock]=\"stock\" [graphHeight]=\"graphHeight\"\n             [closeBuySellBoxFor]=\"closeBuySellBoxFor\"\n             (message)=\"messageHandler($event)\"\n             (buySellOrder)=\"buySellOrderHandler($event)\">\n      </stock>\n    </div>\n</div>\n<ng2-toasty></ng2-toasty>\n\n<div class=\"container-fluid\" style=\"position: relative;\">\n  <div style=\"position: absolute; top: 0; right: 0;\">\n    <span class=\"glyphicon glyphicon-chevron-down\"  [style.display]=\"utilsOpen ? 'none'  : 'block'\"\n          style=\"cursor: pointer;\"\n          (click)=\"utilsOpen = !utilsOpen\"></span>\n    <span class=\"glyphicon glyphicon-chevron-up\"    [style.display]=\"utilsOpen ? 'block' : 'none'\"\n          style=\"cursor: pointer;\"\n          (click)=\"utilsOpen = !utilsOpen\"></span>\n  </div>\n  <div class=\"row\" [style.display]=\"utilsOpen ? 'block' : 'none'\">\n    <div class=\"col-xs-3 col-sm-2 col-md-1\"><label>Test Sound</label></div>\n    <div class=\"col-xs-3 col-sm-2 col-md-1\">\n      <button class=\"btn btn-default\" (click)=\"play('buy')\">Play buy</button>\n    </div>\n    <div class=\"col-xs-3 col-sm-2 col-md-1\">\n      <button class=\"btn btn-default\" (click)=\"play('sell')\">Play sell</button>\n    </div>\n    <div class=\"col-xs-3 col-sm-2 col-md-1 form-inline\">\n      <label for=\"nosound\">No sound</label>\n      <input type=\"checkbox\" id=\"nosound\" [(ngModel)]=\"nosound\" [ngModelOptions]=\"{standalone: true}\"\n             class=\"form-control\" style=\"width: auto;\"/>\n    </div>\n  </div>\n  <div class=\"row\" [style.display]=\"utilsOpen ? 'block' : 'none'\">\n    <div class=\"col-xs-4 col-sm-4 col-md-3 col-lg-2\">\n      <button class=\"btn btn-default\" (click)=\"clearHiddenOrderIds()\">Clear hidden Order ID's</button>\n    </div>\n    <div class=\"col-xs-8 form-inline\">\n      <label>Far back for Orders</label>\n      <input type=\"text\" [(ngModel)]=\"farBackForOrders\" [ngModelOptions]=\"{standalone: true}\"\n             class=\"form-control\" style=\"width: auto;\">\n      <button class=\"btn btn-default\" (click)=\"setFarBackForOrders()\">Send</button>\n    </div>\n  </div>\n  <div class=\"row\" [style.display]=\"utilsOpen ? 'block' : 'none'\">\n    <div class=\"col-xs-1\">\n      <button class=\"btn btn-default\" (click)=\"writeDbToJson()\">Stop</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model2__ = __webpack_require__("../../../../../src/app/model2.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__websocket_service__ = __webpack_require__("../../../../../src/app/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toasty__ = __webpack_require__("../../../../ng2-toasty/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let AppComponent = class AppComponent {
    constructor(wsService, http, toastyService, toastyConfig) {
        this.wsService = wsService;
        this.http = http;
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        this.stocks = [];
        this.graphHeight = '20px';
        this.nosound = true;
        this.farBackForOrders = 33;
        this.utilsOpen = false;
        const url = new URL(location.href);
        this.wsService.createObservableSocket('ws://' + url.hostname + ':' + url.port + '/websocket/quotes').subscribe(data => {
            if (data.indexOf('QUOTES: ') === 0) {
                const newStocks = JSON.parse(data.replace('QUOTES: ', ''));
                if (this.stocks.length === 0) {
                    this.stocks = newStocks;
                }
                else {
                    this.update(this.stocks, newStocks);
                }
            }
            else if (data.indexOf('GRAPHS: ') === 0) {
                const newTime = new Date().getTime();
                this.stocks.forEach(stock => stock.graphUrl = '/graph/' + stock.symbol + '?' + newTime);
            }
            else if (data.indexOf('GRAPH HEIGHT: ') === 0) {
                this.graphHeight = data.replace('GRAPH HEIGHT: ', '') + 'px';
            }
            else if (data.indexOf('ORDERS: ') === 0) {
                const symbolOrdersMap = JSON.parse(data.replace('ORDERS: ', ''));
                this.stocks.forEach(stock => {
                    stock.orders = symbolOrdersMap[stock.symbol];
                    if (stock.orders) {
                        stock.orders.forEach(order => {
                            order.justRemoved = false;
                            order.justCancelled = false;
                        });
                    }
                });
            }
            else if (data.indexOf('NEW ORDER: ') === 0) {
                const newOrder = JSON.parse(data.replace('NEW ORDER: ', ''));
                const stock = this.stocks.find(stock => stock.symbol === newOrder.symbol);
                if (stock !== undefined) {
                    newOrder.justRemoved = false;
                    newOrder.justCancelled = false;
                    if (stock.orders === undefined) {
                        stock.orders = [newOrder];
                    }
                    else {
                        stock.orders.push(newOrder);
                    }
                }
                else {
                    this.toastyService.error({
                        title: 'Unable to find a stock for this new order',
                        msg: data.replace('NEW ORDER: ', '')
                    });
                }
            }
            else if (data.indexOf('POSITIONS: ') === 0) {
                const symbolPositionMap = JSON.parse(data.replace('POSITIONS: ', ''));
                this.stocks.forEach(stock => {
                    const position = symbolPositionMap[stock.symbol];
                    if (position) {
                        stock.quantity = position.quantity;
                        stock.averageBuyPrice = position.averageBuyPrice;
                        stock.heldForSells = position.heldForSells;
                    }
                });
            }
            else if (data.indexOf('BUY SELL: ') === 0) {
                const buySellOrder = JSON.parse(data.replace('BUY SELL: ', ''));
                const toastOptions = {
                    title: 'Successfully sent an order to Robinhood',
                    msg: buySellOrder.side + ' ' + buySellOrder.quantity + ' ' + buySellOrder.symbol + ' shares @ $' +
                        buySellOrder.price + ' each.'
                };
                this.toastyService.success(toastOptions);
            }
            else if (data.indexOf('CANCELLED ORDER: ') === 0) {
                this.toastyService.info({
                    title: "CANCELLED ORDER",
                    msg: data.replace('CANCELLED ORDER: ', '')
                });
            }
            else if (data.indexOf('SOUND: ') === 0) {
                this.play(data.replace('SOUND: ', ''));
            }
            else if (data.indexOf('FIX ME: ') === 0) {
                const array = data.split('|');
                const title = array.length > 1 ? array[0] : 'FiX ME in app.component.ts';
                const msg = array.length > 1 ? array[1] : array[0].replace('FIX ME: ', '');
                this.toastyService.error({
                    title: title,
                    msg: msg,
                    timeout: 9876
                });
            }
            else if (data.indexOf('ERROR: ') === 0) {
                const array = data.replace('ERROR: ', '').split('|');
                const title = array.length > 1 ? array[0] : 'ERROR';
                const msg = array.length > 1 ? array[1] : array[0];
                this.toastyService.error({
                    title: title,
                    msg: msg,
                    timeout: 9876
                });
            }
        }, error => {
            console.log('Error channel:');
            console.log(error);
            const toastOptions = {
                title: 'You need to reload the page',
                msg: '',
                timeout: 9999999
            };
            this.toastyService.error(toastOptions);
        }, () => console.log('The observable stream is complete.'));
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = 'top-right';
        this.toastyConfig.timeout = 6789;
        this.toastyConfig.showClose = true;
    }
    update(stocks, newStocks) {
        newStocks.forEach(stock => {
            const oldStock = stocks.find(s => s.symbol === stock.symbol);
            if (oldStock !== undefined) {
                oldStock.dayMin = stock.dayMin;
                oldStock.dayMax = stock.dayMax;
                oldStock.price = stock.price;
                oldStock.weekPercentage = stock.weekPercentage;
                oldStock.dayPercentage = stock.dayPercentage;
                oldStock.last5minsMin = stock.last5minsMin;
                oldStock.last5minsMax = stock.last5minsMax;
                oldStock.down = stock.down;
                oldStock.up = stock.up;
            }
        });
    }
    messageHandler(message) {
        const toastOptions = {
            title: message.title,
            msg: message.detail
        };
        this.toastyService[__WEBPACK_IMPORTED_MODULE_2__model2__["a" /* LogLevel */][message.logLevel]](toastOptions);
    }
    buySellOrderHandler(buySellOrder) {
        const that = this;
        const toastOptions = {
            title: buySellOrder.side === 'buy' ? 'Buy' : 'Sell',
            msg: buySellOrder.quantity + ' ' + buySellOrder.symbol + ' shares @ $' + buySellOrder.price + ' each. Total: $' +
                buySellOrder.quantity * buySellOrder.price + '.',
            onRemove: function (toast) {
                // if this string doesn't change every time, the stock component cannot be notified
                that.closeBuySellBoxFor = buySellOrder.symbol + ' ' + new Date().getTime();
            }
        };
        this.toastyService.info(toastOptions);
        this.wsService.sendMessage('BUY SELL: ' + JSON.stringify(buySellOrder));
    }
    play(word) {
        if (!this.nosound) {
            const audio = new Audio();
            audio.src = '/sound/' + word + '.mp3';
            audio.load();
            audio.play();
        }
    }
    setFarBackForOrders() {
        this.farBackForOrders = parseInt('' + this.farBackForOrders);
        if (isNaN(this.farBackForOrders)) {
            this.farBackForOrders = 8;
        }
        this.http.get('/utils/far-back-for-orders?farBackForOrders=' + this.farBackForOrders)
            .subscribe(data => {
            console.log(data);
        });
    }
    clearHiddenOrderIds() {
        this.http.get('/utils/clear-hidden-order-ids')
            .subscribe(data => {
            console.log(data);
        });
    }
    writeDbToJson() {
        this.http.get('/utils/write-db-to-json')
            .subscribe(data => {
            console.log(data);
        });
    }
};
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__websocket_service__["a" /* WebsocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__websocket_service__["a" /* WebsocketService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toasty__["c" /* ToastyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng2_toasty__["c" /* ToastyService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toasty__["a" /* ToastyConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng2_toasty__["a" /* ToastyConfig */]) === "function" && _d || Object])
], AppComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notification_component__ = __webpack_require__("../../../../../src/app/notification.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stock_component__ = __webpack_require__("../../../../../src/app/stock.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__websocket_service__ = __webpack_require__("../../../../../src/app/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toasty__ = __webpack_require__("../../../../ng2-toasty/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_3__notification_component__["a" /* NotificationComponent */],
            __WEBPACK_IMPORTED_MODULE_4__stock_component__["a" /* StockComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_6_ng2_toasty__["b" /* ToastyModule */].forRoot()
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_5__websocket_service__["a" /* WebsocketService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/model.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=model.js.map

/***/ }),

/***/ "../../../../../src/app/model2.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogLevel; });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["info"] = 0] = "info";
    LogLevel[LogLevel["success"] = 1] = "success";
    LogLevel[LogLevel["wait"] = 2] = "wait";
    LogLevel[LogLevel["error"] = 3] = "error";
    LogLevel[LogLevel["warning"] = 4] = "warning";
})(LogLevel || (LogLevel = {}));
//# sourceMappingURL=model2.js.map

/***/ }),

/***/ "../../../../../src/app/notification.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/notification.component.html":
/***/ (function(module, exports) {

module.exports = "This is the notification component.\n"

/***/ }),

/***/ "../../../../../src/app/notification.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let NotificationComponent = class NotificationComponent {
};
NotificationComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'notification',
        template: __webpack_require__("../../../../../src/app/notification.component.html"),
        styles: [__webpack_require__("../../../../../src/app/notification.component.css")]
    })
], NotificationComponent);

//# sourceMappingURL=notification.component.js.map

/***/ }),

/***/ "../../../../../src/app/stock.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "td.symbol { width: 3.8em; border-bottom: 1px solid #ccc; }\ntd.symbol .position { color: #666; font-size: 82%; }\n\ntd.min-max { width: 7.2em; }\ntd.min-max .plus-minus { color: rgba(33,33,33,.19); cursor: pointer; }\ntd.min-max span.day-week-min-max { width: 3.55em; text-align: right; display: inline-block; }\n\ntd.graph { width: 1px; border-bottom: 1px solid #FFF; }\ntd.graph input { opacity: .7; padding-left: 4px; padding-right: 4px; }\ntd.graph .btn-xs { opacity: .69; }\ntd.graph label { opacity: .41; }\ntd.graph div.last5mins-min-max { font-size: 90%; color: rgba(41,82,194,.82); padding-right: 1.5em; text-align: right; }\ntd.graph p.price { text-align: right; padding-right: .3em; margin-top: .7em; margin-bottom: .7em; }\ntd.graph span.way-going { color: rgba(19,119,19,.75); padding-left: 2em; }\n\ntd.orders::after { display: block; content: ''; clear: both; }\ntd.orders .order .glyphicon-remove { position: absolute; top: 4px; font-size: 2.4em; cursor: pointer; }\ntd.orders .order .glyphicon-remove.remove { left:  4px; color: rgba(0,194,10,.35); }\ntd.orders .order .glyphicon-remove.cancel { right: 4px; color: rgba(255,82,0,.41); }\ntd.orders .order { border: 2px solid #fff; border-radius: 6px; padding: 0 4px; display: inline-block; position: relative; }\ntd.orders .order.buy.not-confirmed { background: linear-gradient(to right, #FCC, #FCC 33%, #FFF 34%); border: 1px solid #FCC; }\ntd.orders .order.buy.confirmed { background: linear-gradient(to right, #FCC, #FCC 66%, #FFF 67%); border: 1px solid #FCC; }\ntd.orders .order.buy.filled { background-color: #FCC; }\ntd.orders .order.buy.patient { border-color: #FCC; }\ntd.orders .order.sell.not-confirmed { background: linear-gradient(to right, #CCF, #CCF 33%, #FFF 34%); border: 1px solid #CCF; }\ntd.orders .order.sell.confirmed { background: linear-gradient(to right, #CCF, #CCF 66%, #FFF 67%); border: 1px solid #CCF; }\ntd.orders .order.sell.filled { background-color: #CCF; }\ntd.orders .order.sell.patient { border-color: #CCF; }\n\ndiv.top-right { position: absolute; top: 0; right: 0; }\ndiv.bottom-right { position: absolute; bottom: 0; right: 0; }\ndiv.top-left { position: absolute; top: 0; left: 0; }\ndiv.bottom-left { position: absolute; bottom: 0; left: 0; }\n\nspan.aligner { height: 100%; width: 2px; display: inline-block; vertical-align: middle; }\nspan.plus-minus { vertical-align: middle; }\nspan.price-percentage { display: inline-block; vertical-align: middle; color: #666; font-size: 82%; }\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/stock.component.html":
/***/ (function(module, exports) {

module.exports = "<table class=\"stock\">\n  <tbody>\n    <tr>\n      <td class=\"symbol\">\n        <div [style.height]=\"graphHeight\" style=\"position: relative;\">\n          <div class=\"top-left\">\n            {{ stock.symbol }}\n            <div class=\"position\" *ngIf=\"stock.quantity\">\n              {{ stock.quantity }} @ {{ stock.averageBuyPrice }}<br/>\n              held: {{ stock.heldForSells }}\n            </div>\n          </div>\n        </div>\n      </td>\n      <td class=\"min-max\">\n        <div [style.height]=\"graphHeight\" style=\"position: relative; text-align: right;\">\n          <div class=\"top-right small\">\n            <span class=\"day-week-min-max\">{{ stock.day5Max }}</span>\n            <span class=\"day-week-min-max\">{{ stock.dayMax }}</span>\n          </div>\n          <div class=\"bottom-right small\">\n            <span class=\"day-week-min-max\">{{ stock.day5Min }}</span>\n            <span class=\"day-week-min-max\">{{ stock.dayMin }}</span>\n          </div>\n          <span class=\"aligner\"></span>\n          <span class=\"price-percentage\">\n            5days &lt; {{ stock.weekPercentage }}%<br/>\n            today &lt; {{ stock.dayPercentage }}%\n          </span>\n          <span class=\"glyphicon glyphicon-plus plus-minus\"\n                [style.display]=\"buySellOpen ? 'none' : 'inline-block'\" (click)=\"toggleBuySellOpen()\"></span>\n          <span class=\"glyphicon glyphicon-minus plus-minus\"\n                [style.display]=\"buySellOpen ? 'inline-block' : 'none'\" (click)=\"toggleBuySellOpen()\"></span>\n        </div>\n      </td>\n      <td class=\"graph\">\n        <div style=\"position: relative;\">\n          <img [src]=\"stock.graphUrl\"/>\n          <div class=\"top-right\">\n            <div class=\"last5mins-min-max\">{{ stock.last5minsMax}}</div>\n            <p class=\"price\">{{ stock.price }}</p>\n            <div class=\"last5mins-min-max\">{{ stock.last5minsMin}}</div>\n          </div>\n          <div class=\"top-left\">\n            <form class=\"form-inline\" [style.display]=\"buySellOpen ? 'block' : 'none'\">\n              <table>\n                <tr>\n                  <td>\n                    <button class=\"btn btn-warning btn-xs\" (click)=\"buy()\">Buy</button>\n                    <input class=\"form-control input-sm\" style=\"width: 3em; text-align: center;\"\n                           [(ngModel)]=\"numberOfSharesToTrade\" [ngModelOptions]=\"{standalone: true}\"/>\n                  </td>\n                  <td style=\"text-align: right;\"><label>@ $</label></td>\n                  <td>\n                    <input class=\"form-control input-sm\" style=\"width: 3.9em;\" [(ngModel)]=\"priceToTrade\"\n                           [ngModelOptions]=\"{standalone: true}\"/>\n                  </td>\n                  <td><button class=\"btn btn-primary btn-xs\" (click)=\"sell()\">Sell</button></td>\n                  <td><label>Wait?</label></td>\n                </tr>\n                <tr>\n                  <td><label>Re-sell/buy? <input type=\"checkbox\" [(ngModel)]=\"resell\" [ngModelOptions]=\"{standalone: true}\"></label></td>\n                  <td style=\"text-align: right;\">\n                    <label [style.display]=\"resell ? 'inline-block' : 'none'\">&plusmn; $</label>\n                  </td>\n                  <td colspan=\"2\">\n                    <input class=\"form-control input-sm\" style=\"width: 3.9em;\"  [(ngModel)]=\"resellDelta\"\n                           [style.display]=\"resell ? 'inline-block' : 'none'\" [ngModelOptions]=\"{standalone: true}\"/>\n                  </td>\n                  <td><input type=\"checkbox\" [(ngModel)]=\"wait\" [ngModelOptions]=\"{standalone: true}\"/></td>\n                </tr>\n              </table>\n            </form>\n          </div>\n        </div>\n      </td>\n      <td class=\"orders\">\n        <span [class]=\"buildOrderClass(order)\" *ngFor=\"let order of stock.orders\">\n          <span style=\"display: none;\">state: {{ order.state }}</span>\n          {{ order.createdAt }}<br/>{{ order.quantity }} @ {{ order.price }}\n          <span class=\"glyphicon glyphicon-remove remove\" (click)=\"hide(order)\"\n                [style.display]=\"!order.justRemoved && (order.state === 'filled') ? 'inline-block' : 'none'\">\n          </span>\n          <span class=\"glyphicon glyphicon-remove cancel\" (click)=\"cancel(order)\"\n                [style.display]=\"!order.justCancelled && (order.state !== 'filled') ? 'inline-block' : 'none'\">\n          </span>\n        </span>\n      </td>\n    </tr>\n  </tbody>\n</table>\n"

/***/ }),

/***/ "../../../../../src/app/stock.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model__ = __webpack_require__("../../../../../src/app/model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__model__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model2__ = __webpack_require__("../../../../../src/app/model2.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__websocket_service__ = __webpack_require__("../../../../../src/app/websocket.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let StockComponent = class StockComponent {
    constructor(wsService) {
        this.wsService = wsService;
        // this message check if we enter the valid numbers when buying or selling. Nothing to do with the server.
        this.message = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        /*
         * Why don't I send a websocket message to the server inside the stock component? Because I want to see a toast on the
         * screen about this buy/sell order.
         */
        this.buySellOrder = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.buySellOpen = false;
        this.resell = false;
        this.wait = false;
    }
    set closeBuySellBoxFor(_symbol) {
        if (_symbol !== undefined) {
            const a = _symbol.split(' ');
            if (a.length > 0 && a[0] === this.stock.symbol) {
                this.buySellOpen = false;
            }
        }
    }
    toggleBuySellOpen() {
        this.buySellOpen = !this.buySellOpen;
        if (this.buySellOpen) {
            this.resell = false;
        }
    }
    buildOrderClass(order) {
        let styleClasses = 'small order ' + order.side;
        if (order.state === 'confirmed') {
            styleClasses += ' confirmed';
        }
        else if (order.state === 'filled') {
            styleClasses += ' filled';
        }
        else if (order.state === 'patient') {
            styleClasses += ' patient';
        }
        else {
            styleClasses += ' not-confirmed';
        }
        return styleClasses;
    }
    buy() {
        const u = this.checkBeforeBuy();
        if (u !== null) {
            this.message.emit(u);
            return;
        }
        this.buySellOrder.emit({
            symbol: this.stock.symbol,
            instrument: this.stock.instrument,
            price: this.priceToTrade,
            quantity: this.numberOfSharesToTrade,
            side: 'buy',
            resell: this.resell,
            resellDelta: this.resellDelta,
            wait: this.wait
        });
    }
    sell() {
        const u = this.checkBeforeSell();
        if (u !== null) {
            this.message.emit(u);
            return;
        }
        this.buySellOrder.emit({
            symbol: this.stock.symbol,
            instrument: this.stock.instrument,
            price: this.priceToTrade,
            quantity: this.numberOfSharesToTrade,
            side: 'sell',
            resell: this.resell,
            resellDelta: this.resellDelta,
            wait: this.wait
        });
    }
    hide(order) {
        order.justRemoved = true;
        this.wsService.sendMessage('HIDE ORDER: ' + order.id);
    }
    cancel(order) {
        order.justCancelled = true;
        this.wsService.sendMessage('CANCEL ORDER: ' + JSON.stringify({
            id: order.id,
            quantity: order.quantity,
            price: order.price,
            side: order.side,
            symbol: this.stock.symbol,
            state: order.state
        }));
    }
    check() {
        this.numberOfSharesToTrade = parseInt('' + this.numberOfSharesToTrade);
        if (!Number.isInteger(this.numberOfSharesToTrade)) {
            return {
                logLevel: __WEBPACK_IMPORTED_MODULE_2__model2__["a" /* LogLevel */].error,
                title: 'Invalid Arguments',
                detail: 'Number of shares to trade is not an integer'
            };
        }
        if (this.numberOfSharesToTrade <= 0) {
            return {
                logLevel: __WEBPACK_IMPORTED_MODULE_2__model2__["a" /* LogLevel */].error,
                title: 'Invalid Arguments',
                detail: 'Number of shares to trade must > 0'
            };
        }
        this.priceToTrade = parseFloat('' + this.priceToTrade);
        if (isNaN(this.priceToTrade)) {
            return {
                logLevel: __WEBPACK_IMPORTED_MODULE_2__model2__["a" /* LogLevel */].error,
                title: 'Invalid Arguments',
                detail: 'Price to trade is not a number.'
            };
        }
        else if (this.priceToTrade <= 0) {
            return {
                logLevel: __WEBPACK_IMPORTED_MODULE_2__model2__["a" /* LogLevel */].error,
                title: 'Invalid Arguments',
                detail: 'Price to trade cannot be negative.'
            };
        }
        if (this.resell) {
            this.resellDelta = parseFloat('' + this.resellDelta);
            if (isNaN(this.resellDelta) || this.resellDelta <= 0) {
                return {
                    logLevel: __WEBPACK_IMPORTED_MODULE_2__model2__["a" /* LogLevel */].error,
                    title: 'Invalid Arguments',
                    detail: 'resellDelta is not a number or <= 0'
                };
            }
        }
        return null;
    }
    checkBeforeBuy() {
        const u = this.check();
        if (u !== null) {
            return u;
        }
        if (this.priceToTrade > this.stock.price) {
            return {
                logLevel: __WEBPACK_IMPORTED_MODULE_2__model2__["a" /* LogLevel */].error,
                title: 'Your mistake',
                detail: 'Price to buy ' + this.priceToTrade + ' > current price ' + this.stock.price
            };
        }
        return null;
    }
    checkBeforeSell() {
        const u = this.check();
        if (u !== null) {
            return u;
        }
        if (this.priceToTrade < this.stock.price) {
            return {
                logLevel: __WEBPACK_IMPORTED_MODULE_2__model2__["a" /* LogLevel */].error,
                title: 'Your mistake',
                detail: 'Price to sell ' + this.priceToTrade + ' < current price ' + this.stock.price
            };
        }
        return null;
    }
    isGoingOneWayLongEnough(duration) {
        return duration < 15 ? 'none' : 'inline';
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__model__["StockDO"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__model__["StockDO"]) === "function" && _a || Object)
], StockComponent.prototype, "stock", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], StockComponent.prototype, "graphHeight", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && _b || Object)
], StockComponent.prototype, "message", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && _c || Object)
], StockComponent.prototype, "buySellOrder", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], StockComponent.prototype, "closeBuySellBoxFor", null);
StockComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'stock',
        template: __webpack_require__("../../../../../src/app/stock.component.html"),
        styles: [__webpack_require__("../../../../../src/app/stock.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__websocket_service__["a" /* WebsocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__websocket_service__["a" /* WebsocketService */]) === "function" && _d || Object])
], StockComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=stock.component.js.map

/***/ }),

/***/ "../../../../../src/app/websocket.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebsocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let WebsocketService = class WebsocketService {
    createObservableSocket(url) {
        this.ws = new WebSocket(url);
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](observer => {
            this.ws.onmessage = (event) => observer.next(event.data);
            this.ws.onerror = (event) => observer.error(event);
            this.ws.onclose = (event) => observer.complete();
        });
    }
    sendMessage(message) {
        this.ws.send(message);
    }
};
WebsocketService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], WebsocketService);

//# sourceMappingURL=websocket.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
const environment = {
    production: false
};
/* harmony export (immutable) */ __webpack_exports__["a"] = environment;

//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map