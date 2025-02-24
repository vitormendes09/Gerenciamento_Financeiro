import {IUser} from '../../contract/entities/IUser'

export class User{
    id: number | undefined;
    constructor(
        id: number | undefined,
        public name: string,
        public email: string,
        public password: string
    ){}

    public static toDomain(user: IUser): User{
        return new User( user.id, user.name, user.email, user.password);
    }

    public static toDTO(user: User): IUser{
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        }
    }
}