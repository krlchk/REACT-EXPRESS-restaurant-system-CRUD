export interface IUserState {
  user: IUser | null;
  token: string | null;
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

export interface IRegisterResponse {
  status: number;
  message: string;
  user: IUser;
}

export interface ILoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
    user: IUser;
  };
}

export interface ILoginResponseData {
  token: string;
  user: IUser;
}
