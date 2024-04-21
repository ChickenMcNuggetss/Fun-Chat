// export interface IRequest {
//   id: string | null;
//   type: string;
//   payload: object | null;
// }

export interface IUser {
  login: string;
  isLogined: boolean;
}

export interface IUserPayloadResp {
  user: {
    login: string;
    isLogined: boolean;
  };
}

export interface IAllUsers {
  users: [];
}

export interface IRespMessage {
  message: {
    id: string;
    from: string;
    to: string;
    text: string;
    datetime: number;
    status: {
      isDelivered: boolean;
      isReaded: boolean;
      isEdited: boolean;
    };
  };
}

export type Responses = IUserPayloadResp | IAllUsers | IRespMessage;
