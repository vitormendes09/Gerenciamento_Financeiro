export interface IUserRepositoryFind<T>{
    findByEmail(email: string): unknown;
    findById(id: number): Promise<T | null>;
}

export interface IUserRepositoryInsert<T>{
    findByEmail(email: string): unknown;
    insert(id:  number, user: T): Promise<void>;
}

export interface IUserRepositoryUpdate<T>{
    update(id: number, user: T): Promise<T | null>;
}  

export interface IUserRepositoryDelete{
    delete(id: number): Promise<boolean>;
}