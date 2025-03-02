import {IUser} from '../../contract/entities/IUser'
import {Model} from 'mongoose';
import { IUserRepositoryInsert, IUserRepositoryFind, IUserRepositoryUpdate, IUserRepositoryDelete } from '../../contract/repositories/IUserRepository';


export class UserRepositoryInsert implements IUserRepositoryInsert<IUser> {
    constructor(private userModel: Model<IUser>){
         userModel: Model<IUser>
    }
    findByEmail(email: string): Promise<IUser | null>  {
        return this.userModel.findOne({ email }).exec();
    }

    insert(id: string, user: IUser): Promise<void> {
       return this.userModel.create(user).then(() => {});
    }
}

export class UserRepositoryFind implements IUserRepositoryFind<IUser> {
    constructor(private userModel: Model<IUser>){
        userModel: Model<IUser>

    }
    findByEmail(email: string): unknown {
        return this.userModel.findOne({ email }).exec();
    }

    findById(id: string): Promise<IUser | null> {
        return this.userModel.findById(id).exec();
    }
}

export class UserRepositoryUpdate implements IUserRepositoryUpdate<IUser> {
    constructor(private userModel: Model<IUser>){}

    update(id: number, user: IUser): Promise<IUser | null> {
        return this.userModel.findByIdAndUpdate(id, user).exec();
    }
}

export class UserRepositoryDelete implements IUserRepositoryDelete {
    constructor(private userModel: Model<IUser>){}

    delete(id: string): Promise<boolean> {
        return this.userModel.findByIdAndDelete(id).exec().then(() => true);
    }
}

