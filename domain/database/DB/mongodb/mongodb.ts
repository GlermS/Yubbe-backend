const UserModel = require('./models/User')
const CallModel = require('./models/Call')

import dbConnect = require('./dbConnect')
import mongoose = require('mongoose')
import DataBaseInterface,{UserInterface, Response} from '../../interface/database';
import {hash,compare} from 'bcrypt'
import {weekNumber} from 'weeknumber'

class User implements UserInterface{
    name:string;
    id:string;
    authorization:string;
    email:string;

    constructor(name:string, id:string, authorization:string, email:string){
        this.name = name;
        this.id=id;
        this.authorization=authorization;
        this.email=email
    }
}

class MongoDB implements DataBaseInterface{
    async listUsers(userId:string){
        dbConnect();
        var resp:Response
        const authConfirmed = await UserModel.findOne({ _id: userId }).then(async (user) =>{
            if(user.authorization==='adm'){
                resp = {code:200, data: await UserModel.aggregate([{$project:{"_id":1,"weeklyLimit":1, "name":1, "email":1,"authorization":1}}])}
            }else{
                resp = {code:401, data:"Only adm"}
            }
        }).catch((err) =>{
            resp = {code: 400, data:err.toString()}
            })
        return resp
    }

    async admUpdateUser(editorId: string, userData: any){
        dbConnect();
        var resp:Response;
        await UserModel.findOne({'_id':editorId}).then(async (editor)=>{
            if(editor.authorization==='adm'){
                resp= {code:200, data: await UserModel.updateOne({'_id':userData.id},userData)}
            }else{
                resp = {code:401, data:"Only adm"}
            }
        }).catch((err) =>{
            resp = {code: 400, data:err.toString()}
            })
        return resp
    }
    
    async admUpdateUserPassword(editorId:string, userId:string, password:string){
        dbConnect();
        var resp:Response;
        await UserModel.findOne({'_id':editorId}).then(async (editor)=>{
            if(editor.authorization==='adm'){
                await hash(password,12).then(async(hash)=>{
                    resp= {code:200, data: await UserModel.updateOne({'_id':userId},{password:hash})}
                }).catch((err)=>{
                        resp = {code: 409 ,data: 'Deu ruim'}
                         })
            }else{
                resp = {code:401, data:"Only adm"}
            }
            }).catch((err) =>{
                resp = {code: 400, data:err.toString()}
                })
        return resp
    }
     async admDeleteUser(editorId:string, userId:string){
        dbConnect();
        var resp:Response;
        await UserModel.findOne({'_id':editorId}).then(async (editor)=>{
            if(editor.authorization==='adm'){
                resp= {code:200, data: await UserModel.deleteOne({'_id':userId})}
                
            }else{
                resp = {code:401, data:"Only adm"}
            }
            }).catch((err) =>{
                resp = {code: 400, data:err.toString()}
                })
        return resp
    }

    async compareLoginData(email: string, password: string){
        const conn = await dbConnect()
        const resp =await UserModel.find({email: email})
        try{
            const user = await compare(password, resp[0].password).then(isPasswordOk=>{
                if(isPasswordOk){
                    return {code:202, data: new User(resp[0].name, resp[0].id, resp[0].authorization,'')};
                }else{
                    return {code:401, data: new User('', '', '','')};
                }
            });
            return user;
        }catch(error){
            return {code:400, data:new User('', '', '','')}
        }
    }

    async createNewAccount(name:string, email: string, password: string):Promise<any>{
        dbConnect()
        var user = await hash(password,12).then(async(hash)=>{
            const resp:Response = await UserModel.create({name:name, email: email, password:hash}).then(data=>{
                if(data!=undefined){
                    return {code:201, data: new User(data.name, data.id, data.authorization, data.email)}
                    }
                return {code: 401 ,data: new User('', '', '','')}
                }).catch((err)=>{
                return {code: 409 ,data: new User('', '', '','')}
                 })
            return resp
        })
        return user;   
    }
    
    async listCalls(){
        dbConnect()
        const respM = await CallModel.aggregate([{$lookup: {
            from: 'users',
            localField: 'moderatorId',
            foreignField: '_id',
            as: 'moderator'
           }},
           {$project: {
            "_id":1,
            "theme": 1,
            "date":1,
            "clients":1,
            "moderator._id": 1,
            "moderator.name":1
          }},{$match: {date: {$gt:new Date()}}}]).sort({date:1}).then((data) =>{return data})

        return {code:200, data: respM}
    }

    async listUserCalls(userId: string){
        dbConnect()
        const resp = await CallModel.find({clients: userId, date: {$gt:new Date()}}).then((data) =>{return data})
        const respM = await CallModel.find({
            "moderatorId": mongoose.Types.ObjectId(userId),
            date: {$gt:new Date()}
           }).then(data=>{return data})
        return {code:200, data: {client: resp, moderator:respM}}
    }

    async createCall(callData:any):Promise<Response>{
        dbConnect()
        var data = {}
        if(callData.theme){
            data['theme'] = callData.theme}
        if(callData.date){
            data['date'] =callData.date}

        const resp = await CallModel.create(data).then((data)=>{return {code:201, data}}).catch((err)=>{return {code: 404, data: err.toString()}})
        return resp
    }

    async joinCall(userId: String, callId: String):Promise<Response>{
        dbConnect()
        const response = await CallModel.findOne({ _id: callId }).then(call =>{
            if(call.clients.length < 5){
                return {isNotFull : true, date: call.date}
            }else{
                return {isNotFull: false}
            }
        }).catch((err) =>{
            return {isNotFull: false}})

        var resp:Response;
        if(response.isNotFull){
            var lastWeekDate = new Date(response.date)
            lastWeekDate.setDate(lastWeekDate.getDate()-8);
            const respM = await CallModel.find({$and:[{date:{$gte:lastWeekDate}},{clients:userId}]}).sort({date:1}).then((data) =>{return data})
            var isNotRegistered = true;
            respM.every((call, id)=>{
                if(weekNumber(call.date)===weekNumber(response.date)){
                    isNotRegistered = false;
                    return
                }
            })
            if(isNotRegistered){
                const op = await CallModel.updateOne({ _id: callId },{$addToSet:{clients:userId}});
            if(op.nModified>0){
                resp = {code: 201 ,data: "The user was registered"};
            }else{
                resp = {code: 202 ,data: "The user is already registered"}; }  
            }else{
                resp ={code: 429, data: "Weekly limit"}
            }
           
            
        }else{
            resp = {code: 423, data: "The call is full"}
        }
        return resp
    }

    async moderateCall(userId: string, authorization: string, callId: String):Promise<Response>{
        dbConnect()
        var resp:Response
        const authConfirmed = await UserModel.findOne({ _id: userId }).then(async (user) =>{
            if(user.authorization===authorization){
                    const op = await CallModel.updateOne({ _id: callId, moderatorId:{$exists:false}},{moderatorId: user._id});
                    if(op.nModified>0){
                        resp = {code: 201 ,data: "The moderator was registered"};
                    }else{
                        resp = {code: 401 ,data: "The call already has a moderator"};   
                    }
                }else{
                resp = {code: 423, data: "Data don't match"}
            }
        }).catch((err) =>{
            console.log(err)
        })
        return resp
    }

    admCallInfo =async (editorId:string, callId:any) =>{
        dbConnect();
        var resp:any;

        await UserModel.findOne({'_id':editorId}).then(async (editor)=>{
            if(editor.authorization==='adm'){
                resp= {code:200, data: await CallModel.aggregate([{$lookup: {
                    from: 'users',
                    localField: 'moderatorId',
                    foreignField: '_id',
                    as: 'moderator'
                   }},
                   {$lookup: {
                    from: 'users',
                    localField: 'clients',
                    foreignField: '_id',
                    as: 'clients'
                   }},{
                       $project:{
                           "_id": 1,
                           "clients.name": 1,
                           "clients.email": 1,
                           "moderator.name": 1,
                           "moderator.email": 1,
                           "date": 1,
                           "theme": 1
                       }
                   },
                   {$match:{"_id":mongoose.Types.ObjectId(callId)}}])}
                
            }else{
                resp = {code:401, data:"Only adm"}
            }
            }).catch((err) =>{
                resp = {code: 400, data:err.toString()}
                })
        return resp
    }

    admCheckEmail = async (checker:string, email: any) =>{
        dbConnect();
        var resp ={registered:false, name:''};

        await UserModel.findOne({'_id':checker}).then(async (user)=>{
            if(user.authorization==='adm'){
                await UserModel.find({email}).then((result)=>{
                    if(result.length>0){
                        resp = {registered:true, name:result[0].name}
                    }
                }
                    
                )
            }})
        return {code:200, data:resp}
}

    admGetUserIdByEmail = async (email: Array<string>) =>{
        var resp:any;
        if(email.length>1){
            await UserModel.aggregate([{$match:{email: {$in: email}}},{$project:{_id:1}}]).then(async (users)=>{
                resp = users.map((user, i)=>{
                    return mongoose.Types.ObjectId(user._id)
                })
            })
        }else{
            await UserModel.findOne({email}).then(async (user)=>{
                resp = mongoose.Types.ObjectId(user._id)
            })
        }
        return resp
    }

    admUpdateCall =async (editorId:string, callId:any, callData:any) =>{
        dbConnect();
        var resp:any;

        await UserModel.findOne({'_id':editorId}).then(async (editor)=>{
            if(editor.authorization==='adm'){
                var data = {}
                if(callData.clients){
                    data['clients'] = await this.admGetUserIdByEmail(callData.clients)
                }
                if(callData.moderator){
                    data['moderatorId'] = await this.admGetUserIdByEmail([callData.moderator])
                }
                if(callData.theme){
                    data['theme'] = callData.theme
                }
                if(callData.date){
                    data['date'] =callData.date
                }
                resp= {code:200, data:await CallModel.updateOne({"_id":callId},data)}
                
            }else{
                resp = {code:401, data:"Only adm"}
            }
            }).catch((err) =>{
                resp = {code: 400, data:err.toString()}
                })
        return resp
    }

    async admCallAddClient(editorId:string ,userEmail: any, callId: any){
        dbConnect()
        const response = await CallModel.findOne({ _id: callId }).then(call =>{
            if(call.clients.length < process.env.CALL_LIMIT){
                return {isNotFull : true}
            }else{
                return {isNotFull: false}
            }
        }).catch((err) =>{
            return {isNotFull: false}})

        var resp:any
        if(response.isNotFull){
            await UserModel.findOne({'_id':editorId}).then(async (editor)=>{
                const userid =await this.admGetUserIdByEmail([userEmail])
                const respM = await CallModel.updateOne({_id:callId},{$addToSet:{clients:userid}})
                resp = {code:200, data:respM}
            }).catch((err) =>{
                resp = {code:405, data:err.toString()}
            })  
        }else{
            resp = {code: 423, data: "The call is full"}
        }
        return resp
    }

    async admCallRemoveClient(editorId:string ,userEmail: any, callId: any){
        dbConnect()
        var resp:any
       
        await UserModel.findOne({'_id':editorId}).then(async (editor)=>{
            if(editor.authorization==='adm'){
                const userid =await this.admGetUserIdByEmail([userEmail])
                const respM = await CallModel.updateOne({_id:callId},{$pull:{clients:userid}})
                resp = {code:200, data:respM}
            }else{
                resp = {code:401, data:"Not allowed"}
            }
            
        }).catch((err) =>{
            resp = {code:405, data:err.toString()}
        })  

        return resp
    }

    admDeleteCall = async (editorId:string, callId:any) =>{
        dbConnect();
        var resp:any;

        await UserModel.findOne({'_id':editorId}).then(async (editor)=>{
            if(editor.authorization==='adm'){
                resp= {code:200, data:await CallModel.deleteOne({"_id":callId})}
                
            }else{
                resp = {code:401, data:"Only adm"}
            }
            }).catch((err) =>{
                resp = {code: 400, data:err.toString()}
                })
        return resp
    }
}

export default MongoDB;