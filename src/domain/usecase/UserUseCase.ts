import { IUserRepositoryFind, IUserRepositoryDelete, IUserRepositoryInsert, IUserRepositoryUpdate } from "../../contract/repositories/IUserRepository";
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
}

export class UserUseCase{
    private userRepositoryFind: IUserRepositoryFind<IUser>;
    private userRepositoryDelete: IUserRepositoryDelete;
    private userRepositoryInsert: IUserRepositoryInsert<IUser>;
    private userRepositoryUpdate: IUserRepositoryUpdate<IUser>;

    constructor(userRepositoryFind: IUserRepositoryFind<IUser>, userRepositoryDelete: IUserRepositoryDelete, userRepositoryInsert: IUserRepositoryInsert<IUser>, userRepositoryUpdate: IUserRepositoryUpdate<IUser>){
        this.userRepositoryFind = userRepositoryFind;
        this.userRepositoryDelete = userRepositoryDelete;
        this.userRepositoryInsert = userRepositoryInsert;
        this.userRepositoryUpdate = userRepositoryUpdate;
    }

    async perform(input: UserInput): Promise<UserOutput> {
        const { name, email, password } = input;

        // Verificar se todos os dados foram fornecidos
        if (!name || !email || !password) {
            return { success: false, message: "Todos os campos são obrigatórios." };
        }

        // Verificar se o nome tem pelo menos 4 caracteres
        if (name.length < 4) {
            return { success: false, message: "O nome deve ter no mínimo 4 caracteres." };
        }

        // Verificar se a senha tem pelo menos 5 caracteres
        if (password.length < 5) {
            return { success: false, message: "A senha deve ter no mínimo 5 caracteres." };
        }

        // Verificar se o e-mail já está cadastrado
        const existingUser = await this.userRepositoryFind.findByEmail(email);
        if (existingUser) {
            return { success: false, message: "E-mail já cadastrado." };
        }

        // Criar novo usuário
        const newUser: IUser = { name, email, password };
        const id = Date.now(); 
        await this.userRepositoryInsert.insert(id, newUser);
        const savedUser = { id, ...newUser };

        return {
            success: true,
            message: "Usuário cadastrado com sucesso!",
            user: savedUser
        };
    }


}