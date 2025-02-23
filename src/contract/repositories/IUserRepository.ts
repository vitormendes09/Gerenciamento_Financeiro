export interface IUserRepositoryFind<T>{
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
}

export interface IUserRepositoryInsert<T>{
    insert(id:  number, user: T): Promise<void>;
}

export interface IUserRepositoryUpdate<T>{
    update(id: number, user: T): Promise<T | null>;
}  

export interface IUserRepositoryDelete{
    delete(id: number): Promise<boolean>;
}