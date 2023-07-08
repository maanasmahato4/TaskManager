export interface IAuth{
    email: string,
    password: string,
    confirm_password: string
}

export interface IAuthData{
    email: string,
    password: string
}

export interface IAuthContext {
    token: string,
    setToken: (token:string) => void,
    decodedToken: any,
    setDecodedToken: (decodedToken: any) => void
}

export interface IAddTodoData {
    userId: number,
    status: string | boolean,
    todo: string
}

export interface IFetchTodoData {
    id: number
    userId: number,
    status: string | boolean,
    todo: string
}


export interface IUTodoData {
    userId: number,
    status: boolean | string,
    todo: string
}