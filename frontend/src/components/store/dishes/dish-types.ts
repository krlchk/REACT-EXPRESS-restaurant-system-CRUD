export interface IDishesState {
  dishes: IDish[];
  cartDishes: ICartDish[];
  orders: IOrder[];
  status: string;
  error: string | null;
}

export interface ICartDish {
  amount: number;
  dish: IDish;
}

export interface IDish {
  id: number;
  description: string;
  name: string;
  price: number;
}
export interface IResponseForDish {
  status: number;
  message: string;
  data: IDish[];
}
export interface IResponseForOrder {
  status: number;
  message: string;
  data: IOrder[];
}

export interface ICreateDishResponse {
  status: number;
  message: string;
  data: IDish;
}
export interface IDeleteDishResponse {
  status: number;
  message: string;
  data: IDish;
}

export interface ICreateOrderResponse {
  status: number;
  message: string;
  data: IOrder;
}

export interface IOrder {
  id: number;
  user_id: number;
  status: "pending" | "failed" | "completed";
  dishes: IDish[];
  total_price: number;
}
