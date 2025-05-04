export interface IUserState {
  user: IUser | null;
  status: string;
  error: null | string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
}
