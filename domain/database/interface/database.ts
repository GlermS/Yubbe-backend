
export interface UserInterface{
    name: string;
    id: string;
    authorization: string;
    email: string;
}

export interface Response{
    code: number;
    data: any;
}

export default interface DataBaseInterface{
    compareLoginData(email: string, password: string):Promise<Response>;
    createNewAccount(name:string, email: string, password: string):Promise<Response>;
    createCall(callData:any):Promise<Response>;
    joinCall(userId: String, callId: String):Promise<Response>;
    moderateCall(userId: string, authorization: string, callId: String):Promise<Response>;

    listUsers(name:string, email: string, password: string):Promise<Response>;
    listUserCalls(userId: string):Promise<Response>;
    listCalls():Promise<Response>;

    admCheckEmail(checker:string, email: any):Promise<Response>;
    admCallInfo(editorId:string, callId:any):Promise<Response>;
    admUpdateUser(editorId:string, userData:UserInterface):Promise<Response>;
    admUpdateUserPassword(editorId:string, userId:string, password:string):Promise<Response>;
    admDeleteUser(editorId:string, userId:string):Promise<Response>;
    admGetUserIdByEmail(email: Array<string>):Promise<Response>;
    admUpdateCall(editorId:string, callId:any, callData:any):Promise<Response>;
    admCallAddClient(editorId:string ,userEmail: any, callId: any):Promise<Response>;
    admCallRemoveClient(editorId:string ,userEmail: any, callId: any):Promise<Response>;
    admDeleteCall(editorId:string, callId:any):Promise<Response>;
};