"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PublicService {
    constructor() {
        this.getHelloWorld = () => {
            const result = {
                success: true,
                message: "Hello World",
            };
            return result;
        };
    }
}
exports.default = new PublicService();
