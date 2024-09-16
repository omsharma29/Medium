"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogInputs = exports.SignInInput = exports.SignupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    name: zod_1.default.string().optional()
});
exports.SignInInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
});
// blog 
exports.blogInputs = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
