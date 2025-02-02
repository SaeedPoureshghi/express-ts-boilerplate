declare global {
  interface ITelegramUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    photo_url: string;
  }
  namespace Express {
    interface Request {
      user?: ITelegramUser;
    }
  }
}

export {};
