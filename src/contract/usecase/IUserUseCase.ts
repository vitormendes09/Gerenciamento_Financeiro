import { IUser } from "../../contract/entities/IUser";

interface UserInput {
    name: string;
    email: string;
    password: string;
}

interface UserOutput {
    success: boolean;
    message: string;
    user?: IUser;
    token?: string;
}

export interface IUserUseCase {
    register(input: UserInput): Promise<UserOutput>;
    login(email: string, password: string): Promise<UserOutput>;
    getUserById(id: number): Promise<UserOutput>;
}
