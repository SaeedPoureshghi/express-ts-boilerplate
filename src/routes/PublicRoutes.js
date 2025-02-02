"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PublicController_1 = __importDefault(require("@controllers/PublicController"));
const router = (0, express_1.Router)();
/**
 *  GET /
 * @tags Public
 * @summary Get Hello World
 * @returns {HelloWorldResponse} 200 - A successful response
 */
router.get("/", PublicController_1.default.getHelloWorld);
exports.default = router;
