export interface StockDO {
  symbol: string;
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
}

export interface Order {
  id: string;
  quantity: number;
  price: number;
  state: string;
  side: string;
  createdAt: string
}
