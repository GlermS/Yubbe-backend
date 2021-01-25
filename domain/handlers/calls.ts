import express = require('express');
import MongoDB from "../database/DB/mongodb/mongodb";
import { Response } from '../database/interface/database';
import TokenAuthenticator from "../validation/token-authentication";

class CallsHandler{
    async listCalls(req:express.Request){
        const auth = this.authenticateData(req)
        if(auth.code===202){
            const db = new MongoDB()
            const respo =  await db.listCalls()
            return respo
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }

    async createCall(req:express.Request){
        const auth = this.authenticateData(req)

        if(auth.code===202 && auth.data.authorization === "adm"){
            const db = new MongoDB()

            const call =  await db.createCall(req.body)
            return call
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }

    async joinCall(req:express.Request):Promise<Response>{
        const auth = this.authenticateData(req)

        if(auth.code===202){
            const db = new MongoDB()
            const call =  await db.joinCall(auth.data.id, req.body.callId).catch(()=>{return {code:500, data:'Error interno'}})
            return call
        }else{
            return {code: 401,data: "Not allowed"}
        }
    }

    async moderateCall(req:express.Request){
        const auth = this.authenticateData(req)

        if(auth.code===202 && (auth.data.authorization==='adm' || auth.data.authorization === 'moderator')){
            const db = new MongoDB()
            const call =  await db.moderateCall(auth.data.id, auth.data.authorization, req.body.callId).catch(()=>{return {code:500, data:'Error interno'}})
            return call
        }else{
            return {code: 401,data: "Not allowed"}
        }
        
    }

    async listUsersCalls(req:express.Request){
        const auth = this.authenticateData(req)

        if(auth.code===202){
            const db = new MongoDB()
            const call =  await db.listUserCalls(auth.data.id)//.catch(console.log)
            return call
        }else{
            return {code: 401, data: "Not allowed"}
        }
        
    }


    authenticateData(req: express.Request):Response{
        const authenticator = new TokenAuthenticator();
        return authenticator.verifyToken(req)
    } 
}

export default CallsHandler;

export class AdmCallsHandler {
    async callInfo(req:express.Request){
        const auth = this.authenticateData(req)

        if(auth.code===202){
            const db = new MongoDB()
            const call =  await db.admCallInfo(auth.data.id, req.query.id)//.catch(console.log)
            return call
        }else{
            return {code: 401, data: "Not allowed"}
        }

    }

    async editCall(req:express.Request){
        const auth = this.authenticateData(req)
        
        if(auth.code===202){
            const db = new MongoDB()
            const call =  await db.admUpdateCall(auth.data.id,req.query.id, req.body)
            return call
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }

    async deleteCall(req:express.Request){
        const auth = this.authenticateData(req)

        if(auth.code===202){
            const db = new MongoDB()
            const call =  await db.admDeleteCall(auth.data.id, req.query.id)
            return call
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }


    async addUserToCall(req:express.Request){
        const auth = this.authenticateData(req)
        if(auth.code===202){
            const db = new MongoDB()
            const call =  await db.admCallAddClient(auth.data.id,req.body.email, req.query.id)
            return call
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }

    async removeUserFromCall(req:express.Request){
        const auth = this.authenticateData(req)
        
        if(auth.code===202){
            const db = new MongoDB()
            const call =  await db.admCallRemoveClient(auth.data.id,req.query.email, req.query.id)
            return call
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }
    

    authenticateData(req: express.Request){
        const authenticator = new TokenAuthenticator();
        return authenticator.verifyToken(req)
    }
}