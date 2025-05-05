export interface IDishesState {
  dishes: IDish[];
  orders: IOrder[];
  status: string;
  error: string | null;
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

export interface ICreateDishResponse {
  status: number;
  message: string;
  data: IDish;
}
export interface IDeleteDishResponse{
  status: number;
  message: string;
  data: IDish;
}

interface IOrder {
  id: number;
  user_id: number;
  status: string;
  total_price: number;
}
