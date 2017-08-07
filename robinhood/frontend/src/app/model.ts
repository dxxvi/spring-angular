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
}

export interface Order {
  id: string;
  quantity: number;
  price: number;
  state: string;
  side: string;
  createdAt: string;
  justRemoved: boolean;
  justCancelled: boolean;
}

export interface BuySellOrder {
  symbol: string;
  instrument: string;
  price: number;
  quantity: number;
  side: string;
}
