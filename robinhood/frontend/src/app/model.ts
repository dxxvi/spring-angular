export interface StockDO {
  symbol: string;
  instrument: string;
  quantity: number;
  averageBuyPrice: number;
  heldForSells: number;
  price: number;
  dayMin: number;
  dayMax: number;
  day5Min: number;
  day5Max: number;
  orders: Array<Order>;
  graphUrl: string;
  weekPercentage: number;
  dayPercentage: number;
  last5minsMin: number;
  last5minsMax: number;
  updatedAt: number[];
  autoRun: boolean;
}

export interface Order {
  id: string;
  quantity: number;
  price: number;
  state: string;
  side: string;
  createdAt: string;
  createdAtTimestamp: number;          // used to sort Orders by created time
  updatedAt: string;
  justRemoved: boolean;                // true means I just clicked the blue X to not see this order on browser
  justCancelled: boolean;              // true means I just clicked the pink X to cancel this order
}

export interface BuySellOrder {
  symbol: string;
  instrument: string;
  price: number;
  quantity: number;
  side: string;
  resell: boolean;
  resellDelta: number;
  wait: boolean;
  startAutoRun: number;                // 0: no auto run, 1: auto sell, -1: auto buy
}
