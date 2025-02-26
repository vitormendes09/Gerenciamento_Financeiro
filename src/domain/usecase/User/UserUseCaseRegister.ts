import { IUserRepositoryInsert } from "../../../contract/repositories/IUserRepository";
import { IUserUseCaseRegister, UserOutput, UserInput} from "../../../contract/usecase/IUserUseCase";
import { IUser } from "../../../contract/entities/IUser";
import bcrypt from "bcrypt";
import { AuthService } from "../../Auth/AuthService";

export class UserUseCaseRegister implements IUserUseCaseRegister {

    private userRepositoryInsert: IUserRepositoryInsert<IUser>;
    constructor(userRepositoryInsert: IUserRepositoryInsert<IUser>){
        this.userRepositoryInsert = userRepositoryInsert;
    }

    async register(input: UserInput): Promise<UserOutput> {
        const { name, email, password } = input;

        // Verificar se todos os dados foram fornecidos

        if (!name || !email || !password) {
            return { success: false, message: "All fields are required." };
        }

        // Verificar se o nome tem pelo menos 4 caracteres  
        if (name.length < 4) {
            return { success: false, message: "Name must have at least 4 characters." };
        }

        // Verificar se a senha tem pelo menos 5 caracteres
        if (password.length < 5) {
            return { success: false, message: "Password must have at least 5 characters." };
        }

        // Verificar se o e-mail já está cadastrado

        const existingUser = await this.userRepositoryInsert.findByEmail(email);

        if (existingUser) {
            return { success: false, message: "Email already registered." };
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUser = { name, email, password: hashedPassword };
        const id = Date.now();
        await this.userRepositoryInsert.insert(id, newUser);
        const savedUser = { id, ...newUser };

        // Gerar token
        const token = AuthService.generateToken(savedUser);

        return {
            success: true,
            message: "User registered successfully.",
            user: savedUser,
            token: token
        }
    }
}
