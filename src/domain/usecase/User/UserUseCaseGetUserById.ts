import { IUserRepositoryFind } from "../../../contract/repositories/IUserRepository";
import { IUser } from "../../../contract/entities/IUser";
import { IUserUseCaseGetUserById, UserOutput } from "../../../contract/usecase/IUserUseCase";

export class UserUseCaseGetUserById implements IUserUseCaseGetUserById {
    private userRepositoryFind: IUserRepositoryFind<IUser>;
    constructor (userRepositoryFind: IUserRepositoryFind<IUser>) {
        this.userRepositoryFind = userRepositoryFind;
    }

    async getUserById(id: string): Promise<UserOutput> {
        if (!id) {
            return {
                success: false,
                message: "Id is required"
            }
        }

        const user = await this.userRepositoryFind.findById(id);

        if(!user){
            return {
                success: false,
                message: "User not found"
            }
        }

        return {
            success: true,
            message: "User found",
            user: user
        }
    }

}