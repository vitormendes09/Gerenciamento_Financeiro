"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static toDomain(user) {
        return new User(user.id, user.name, user.email, user.password);
    }
    static toDTO(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        };
    }
}
exports.User = User;
