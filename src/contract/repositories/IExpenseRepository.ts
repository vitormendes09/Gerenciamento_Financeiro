export interface IExpenseRepositoryFind<T>{
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    findByCategory(category: string): Promise<T[]>;
}

export interface IExpenseRepositoryInsert<T>{
    insert(id:  number, user: T): Promise<void>;
}

export interface IExpenseRepositoryUpdate<T>{
    update(id: number, user: T): Promise<T | null>;
}  

export interface IExpenseRepositoryDelete<T>{
    delete(id: number): Promise<boolean>;
}


