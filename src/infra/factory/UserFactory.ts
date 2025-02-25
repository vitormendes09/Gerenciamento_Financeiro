import { UserController } from "../../controller/UserController";
import { UserUseCase } from "../../domain/usecase/UserUseCase";
import { UserRepository, UserRepositoryDelete, UserRepositoryFind, UserRepositoryUpdate } from "../../data/repository/UserRepository";
import {User} from "../../data/models/User"
import connectDB from "../../data/config/database";

export async function UserFactory() {
    await connectDB();

    


    const userRepositoryFind = new UserRepositoryFind(User);
    const userRepositoryDelete = new UserRepositoryDelete(User);
    const userRepositoryInsert = new UserRepository(User);
    const userRepositoryUpdate = new UserRepositoryUpdate(User);

   
    const userUseCase = new UserUseCase(userRepositoryFind, userRepositoryDelete, userRepositoryInsert, userRepositoryUpdate);
    const userController = new UserController(userUseCase);
    return  userController;

    

    
}
