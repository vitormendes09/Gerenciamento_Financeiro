import { IUserRepositoryFind } from "../../../contract/repositories/IUserRepository";
import { IUser } from "../../../contract/entities/IUser";
import { IUserUseCaseLogin, UserOutput } from "../../../contract/usecase/IUserUseCase";
import bcrypt from "bcrypt";
import { AuthService } from "../../Auth/AuthService";


export class UserUseCaseLogin implements IUserUseCaseLogin {
    private userRepositoryFind: IUserRepositoryFind<IUser>
    constructor(userRepositoryFind: IUserRepositoryFind<IUser>){
        this.userRepositoryFind = userRepositoryFind;
    }

    async login(email: string, password: string): Promise<UserOutput> {
       if (!password) {
            return {
                success: false,
                message: "Password are required"
            }
        }

        const user: IUser | null = await this.userRepositoryFind.findByEmail(email) as IUser | null;

        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return {
                success: false,
                message: "Password is incorrect"
            }
        }

        const token = AuthService.generateToken(user);

        return {
            success: true,
            message: "User logged in",
            user: user,
            token: token
        }
    }
}