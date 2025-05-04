export interface IDishesState {
  dishes: IDish[];
  orders: IOrder[];
}

interface IDish {
  id: number;
  title: string;
  cost: number;
}
interface IOrder {
  id: number;
  user_id: number;
  status: string;
  total_price: number;
}
