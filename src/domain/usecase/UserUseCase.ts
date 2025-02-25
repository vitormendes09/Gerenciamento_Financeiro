import { IUserRepositoryFind, IUserRepositoryDelete, IUserRepositoryInsert, IUserRepositoryUpdate } from "../../contract/repositories/IUserRepository";
import { IUser } from "../../contract/entities/IUser";
import { AuthService } from "../Auth/AuthService";
import bcrypt from 'bcryptjs';
import { IUserUseCase} from "../../contract/usecase/IUserUseCase";



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

export class UserUseCase implements IUserUseCase {
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

    /** 📝 Método para cadastrar um novo usuário */
    async register(input: UserInput): Promise<UserOutput> {
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

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar novo usuário
        const newUser: IUser = { name, email, password: hashedPassword };
        const id = Date.now(); 
        await this.userRepositoryInsert.insert(id, newUser);
        const savedUser = { id, ...newUser };

        return {
            success: true,
            message: "Usuário cadastrado com sucesso!",
            user: savedUser
        };
    }

    /** 🔑 Método para realizar login e gerar um JWT */
    async login(email: string, password: string): Promise<UserOutput> {
        // Buscar usuário pelo e-mail
        const user: IUser | null = await this.userRepositoryFind.findByEmail(email) as IUser | null;

        if (!user) {
            return { success: false, message: "E-mail ou senha inválidos." };
        }

        // Comparar a senha digitada com a armazenada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: "E-mail ou senha inválidos." };
        }

        // Gerar o token JWT
        const token = AuthService.generateToken(user);

        return {
            success: true,
            message: "Login realizado com sucesso!",
            user,
            token
        };
    }

    async getUserById(id: number): Promise<UserOutput> {
        // Verificar se o ID é válido (simulação de validação de ID)
        if (!id) {
            return { success: false, message: "ID do usuário é necessário." };
        }

        const user = await this.userRepositoryFind.findById(id);
        if (!user) {
            return { success: false, message: "Usuário não encontrado." };
        }

        return {
            success: true,
            message: "Usuário encontrado com sucesso!",
            user
        };
    }

}