export interface IExpenseRepositoryFind<T>{
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    findByCategory(category: string, userId: string): Promise<T[]>;
    findByUserId(userId: string): Promise<T[]>;
    findByUserAndDate(userId: string, month: number, year: number): Promise<T[]>;
}

export interface IExpenseRepositoryInsert<T>{
    insert(id: string, user: T): Promise<void>;
}

export interface IExpenseRepositoryDelete<T>{
    delete(id: string): unknown;
    findById(id: string): Promise<boolean>
}


