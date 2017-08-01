export interface Order {
  id: string;
  quantity: number;
  price: number;
  state: string;
  side: string;
}

export interface StockDO {
  symbol: string;
  price: number;
  dayMin: number;
  dayMax: number;
  day5Min: number;
  day5Max: number;
  orders: Array<Order>;
}
