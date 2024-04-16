export interface IRequest {
  id: string | null;
  type: string;
  payload: object | null;
}

export interface IUserPayloadResp {
  user: {
    login: string;
    isLogined: boolean;
  };
}

export interface IAllAuthUsers {
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
