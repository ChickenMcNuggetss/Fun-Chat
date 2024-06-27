export interface IUserRequest {
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

export interface IMessageSended {
  message: {
    to: string;
    text: string;
  };
}

export interface IMessageHistory {
  user: {
    login: string;
  };
}
