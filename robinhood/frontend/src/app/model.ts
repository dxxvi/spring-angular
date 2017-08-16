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
  estMin: number;
  estMax: number;
}

export interface Order {
  id: string;
  quantity: number;
  price: number;
  state: string;
  side: string;
  createdAt: string;
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
}
