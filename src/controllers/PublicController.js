"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PublicService_1 = __importDefault(require("@services/PublicService"));
class PublicController {
    constructor() {
        this.getHelloWorld = (req, res) => {
            const result = PublicService_1.default.getHelloWorld();
            res.status(200).json(result);
        };
    }
}
exports.default = new PublicController();
