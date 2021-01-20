const UserModel = require('./models/User')
const CallModel = require('./models/Call')

import dbConnect = require('./dbConnect')
import mongoose = require('mongoose')
import DataBaseInterface,{UserInterface} from '../../interface/database';
import {hash,compare} from 'bcrypt'
import {weekNumber} from 'weeknumber'

class User implements UserInterface{
    approved: boolean;
    name:string;
    id:string;
    authorization:string;

    constructor(approved: boolean,name:string, id:string, authorization:string){
        this.approved=approved
        this.name = name;
        this.id=id;
        this.authorization=authorization;
    }
}

class MongoDB implements DataBaseInterface{
    async listUsers(userId:string){
        dbConnect();
        var resp:any

        const authConfirmed = await UserModel.findOne({ _id: userId }).then(async (user) =>{
            //console.log(user)
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
        var resp:any;

        console.log(userData)
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
        var resp:any;

        await UserModel.findOne({'_id':editorId}).then(async (editor)=>{
            if(editor.authorization==='adm'){
                await hash(password,12).then(async(hash)=>{
                    resp= {code:200, data: await UserModel.updateOne({'_id':userId},{password:hash})}
                }).catch((err)=>{
                        //console.log(err)
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
        var resp:any;

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
                    return new User(true, resp[0].name, resp[0].id, resp[0].authorization);
                }else{
                    return new User(false, '', '', '');
                }
            });
            return user;
        }catch(error){
            return new User(false, '', '', '')
        }
    }
    async createNewAccount(name:string, email: string, password: string):Promise<any>{
        //console.log("Entrou")
        dbConnect()
        //console.log("Criando conta")
       
        var user = await hash(password,12).then(async(hash)=>{
            //console.log(hash)
            const resp = await UserModel.create({name:name, email: email, password:hash}).then(data=>{
                if(data!=undefined){
                    //.log("User criado")
                    return {code:201, data: new User(true, data.name, data.id, data.authorization)}
                    }
                return {code: 401 ,data: new User(false, '', '', '')}
                }).catch((err)=>{
                //console.log(err)
                return {code: 409 ,data: new User(false, '', '', '')}
                 })
            //console.log("Resp")
            return resp
        })
        //console.log(user)
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

    async listUsersCalls(userId: string){
        dbConnect()
        const resp = await CallModel.find({clients: userId, date: {$gt:new Date()}}).then((data) =>{return data})
        const respM = await CallModel.find({
            "moderatorId": mongoose.Types.ObjectId(userId),
            date: {$gt:new Date()}
           }).then(data=>{return data})

        //console.log(respM)
        return {code:200, data: {client: resp, moderator:respM}}
    }

    async createCall(date: Date, theme: String, moderator: String, ){
        dbConnect()
        const resp = await CallModel.create({date, theme, moderator}).then((data)=>{return data}).catch((err)=>{return {error: err.toString()}})
        return {code:201, data: resp}
    }

    async joinCall(userId: String, callId: String){
        dbConnect()
        const response = await CallModel.findOne({ _id: callId }).then(call =>{
            //console.log(call.clients)
            if(call.clients.length < 5){
                return {isNotFull : true, date: call.date}
            }else{
                return {isNotFull: false}
            }
        }).catch((err) =>{
            //console.log(err)
            return {isNotFull: false}})

        var resp:any
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

    async moderateCall(userId: string, authorization: string, callId: String){
        dbConnect()
        var resp:any
        const authConfirmed = await UserModel.findOne({ _id: userId }).then(async (user) =>{
            //console.log(user)
            if(user.authorization===authorization){
                    const op = await CallModel.updateOne({ _id: callId, moderatorId:{$exists:false}},{moderatorId: user._id});
                    //console.log(op)
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
        //console.log(resp)
        return resp
    }

    
    
}

export default MongoDB;