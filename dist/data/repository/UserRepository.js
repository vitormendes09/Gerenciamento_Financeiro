"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryDelete = exports.UserRepositoryUpdate = exports.UserRepositoryFind = exports.UserRepositoryInsert = void 0;
const mongoose_1 = require("mongoose");
class UserRepositoryInsert {
    constructor(userModel) {
        this.userModel = userModel;
        userModel: mongoose_1.Model;
    }
    findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    insert(id, user) {
        return this.userModel.create(user).then(() => { });
    }
}
exports.UserRepositoryInsert = UserRepositoryInsert;
class UserRepositoryFind {
    constructor(userModel) {
        this.userModel = userModel;
        userModel: mongoose_1.Model;
    }
    findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    findById(id) {
        return this.userModel.findById(id).exec();
    }
}
exports.UserRepositoryFind = UserRepositoryFind;
class UserRepositoryUpdate {
    constructor(userModel) {
        this.userModel = userModel;
    }
    update(id, user) {
        return this.userModel.findByIdAndUpdate(id, user).exec();
    }
}
exports.UserRepositoryUpdate = UserRepositoryUpdate;
class UserRepositoryDelete {
    constructor(userModel) {
        this.userModel = userModel;
    }
    delete(id) {
        return this.userModel.findByIdAndDelete(id).exec().then(() => true);
    }
}
exports.UserRepositoryDelete = UserRepositoryDelete;
