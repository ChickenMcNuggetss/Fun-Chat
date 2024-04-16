export interface IUser {
  user: {
    login: string;
    password: string;
  };
}

export interface IExternalUserData {
  user: {
    login: string;
    isLogined: boolean;
  };
}

export interface IMessage {
  message: {
    to: string;
    text: string;
  };
}
