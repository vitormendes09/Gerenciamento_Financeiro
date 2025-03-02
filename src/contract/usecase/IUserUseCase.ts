import { IUser } from "../../contract/entities/IUser";

export interface UserInput {
    name: string;
    email: string;
    password: string;
}

export interface UserOutput {
    success: boolean;
    message: string;
    user?: IUser | null;
    token?: string;
}



export interface IUserUseCaseRegister {
    register(input: UserInput): Promise<UserOutput>;
}

export interface IUserUseCaseLogin {
    login(email: string, password: string): Promise<UserOutput>;
}

export interface IUserUseCaseGetUserById {
    getUserById(id: string): Promise<UserOutput>;
}
