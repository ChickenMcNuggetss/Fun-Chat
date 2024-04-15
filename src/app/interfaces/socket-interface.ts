export interface IRequest {
  id: string | null;
  type: string;
  payload: object;
}

export interface IPayloadAuth {
  user: {
    login: string;
    password: string;
  };
}
