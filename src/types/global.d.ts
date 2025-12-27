declare global {
  interface User {
    id: number;
    name: string;
  }
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
