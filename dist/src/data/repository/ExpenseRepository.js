"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRepositoryDelete = exports.ExpenseRepositoryFind = exports.ExpenseRepositoryCreate = void 0;
const mongoose_1 = __importStar(require("mongoose"));
class ExpenseRepositoryCreate {
    constructor(expenseModel) {
        this.expenseModel = expenseModel;
        expenseModel: mongoose_1.Model;
    }
    insert(id, expense) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.expenseModel.create(expense);
        });
    }
}
exports.ExpenseRepositoryCreate = ExpenseRepositoryCreate;
class ExpenseRepositoryFind {
    constructor(expenseModel) {
        this.expenseModel = expenseModel;
    }
    findByUserAndDate(userId, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.expenseModel.find({
                iduser: userId,
                date: {
                    $gte: new Date(year, month - 1, 1), // Primeiro dia do mês
                    $lt: new Date(year, month, 1) // Primeiro dia do próximo mês
                }
            }).exec();
        });
    }
    findById(id) {
        return this.expenseModel.findById(id).exec();
    }
    findAll() {
        return this.expenseModel.find().exec();
    }
    findByCategory(userId, category) {
        return this.expenseModel.find({ category: category, iduser: userId }).exec();
    }
    findByUserId(userId) {
        return this.expenseModel.find({ iduser: new mongoose_1.default.Types.ObjectId(userId) }).exec();
    }
}
exports.ExpenseRepositoryFind = ExpenseRepositoryFind;
class ExpenseRepositoryDelete {
    constructor(expenseModel) {
        this.expenseModel = expenseModel;
    }
    delete(id) {
        return this.expenseModel.findByIdAndDelete(id).exec();
    }
    findById(id) {
        return this.expenseModel.findById(id).exec().then(doc => !!doc);
    }
}
exports.ExpenseRepositoryDelete = ExpenseRepositoryDelete;
