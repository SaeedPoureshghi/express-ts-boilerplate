import PublicService from "@services/PublicService";
import { Request, Response } from "express";

class PublicController {
  public getHelloWorld = (req: Request, res: Response) => {
    const result = PublicService.getHelloWorld();
    res.status(200).json(result);
  };
}

export default new PublicController();
