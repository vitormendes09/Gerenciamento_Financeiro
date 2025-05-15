"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET;
class AuthService {
    static verifyToken(token) {
        throw new Error("Method not implemented.");
    }
    static generateToken(user) {
        return jsonwebtoken_1.default.sign({ user }, SECRET, { expiresIn: '1d' });
    }
    static decodeToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, SECRET);
            return decoded.user;
        }
        catch (error) {
            return null;
        }
    }
}
exports.AuthService = AuthService;
