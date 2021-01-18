interface DataBaseInterface{
    compareLoginData(email: string, password: string):Promise<any>;
    createNewAccount(name:string, email: string, password: string):Promise<any>;
}

export interface UserInterface{
    approved: boolean;
    name: string;
    id: string;
    authorization: string;
}

export default DataBaseInterface;