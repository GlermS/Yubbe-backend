import express = require('express');
import MongoDB from "../database/DB/mongodb/mongodb";
import TokenAuthenticator from "../validation/token-authentication";

class CallsHandler{
    async listCalls(req:express.Request){
        const auth = this.authenticateData(req)
        if(auth.approved){
            const db = new MongoDB()
            const respo =  await db.listCalls()
            return respo
        }else{
            return {code: 401, data: "Not allowed"}
        }
        

    }

    async createCall(req:express.Request){
        //console.log(req.body)
        const auth = this.authenticateData(req)
        //console.log(req)
        if(auth.approved && auth.authorization === "adm"){
            const db = new MongoDB()
            console.log(req.body)
            const call =  await db.createCall(req.body)
            return call
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }

    async joinCall(req:express.Request){
        const auth = this.authenticateData(req)
        //console.log(auth)
        //console.log(req.body)
        if(auth.approved){
            const db = new MongoDB()

            
            const call =  await db.joinCall(auth.id, req.body.callId).catch(console.log)
            return call
        }else{
            return {code: 401,message: "Not allowed"}
        }
        
    }
    async moderateCall(req:express.Request){
        const auth = this.authenticateData(req)
        //console.log(auth)
        //console.log(req.body)
        if(auth.approved && (auth.authorization==='adm' || auth.authorization === 'moderator')){
            const db = new MongoDB()
            const call =  await db.moderateCall(auth.id, auth.authorization, req.body.callId).catch(console.log)
            return call
        }else{
            return {code: 401,message: "Not allowed"}
        }
        
    }

    async listUsersCalls(req:express.Request){
        const auth = this.authenticateData(req)
        //console.log(auth)
        //console.log(req.body)
        if(auth.approved){
            const db = new MongoDB()
            const call =  await db.listUsersCalls(auth.id)//.catch(console.log)
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

export default CallsHandler;

export class AdmCallsHandler {
    async callInfo(req:express.Request){
        const auth = this.authenticateData(req)
        //console.log(auth)
        //console.log(req.body)
        if(auth.approved){
            const db = new MongoDB()
            const call =  await db.admCallInfo(auth.id, req.query.id)//.catch(console.log)
            return call
        }else{
            return {code: 401, data: "Not allowed"}
        }

    }

    async editCall(req:express.Request){
        const auth = this.authenticateData(req)
        //console.log(auth)
        //console.log(req.body)
        if(auth.approved){
            const db = new MongoDB()
            const call =  await db.admUpdateCall(auth.id,req.query.id, req.body)
            return call
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }

    async deleteCall(req:express.Request){
        const auth = this.authenticateData(req)
        //console.log(auth)
        //console.log(req.body)
        if(auth.approved){
            const db = new MongoDB()
            const call =  await db.admDeleteCall(auth.id, req.query.id)
            return call
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }


    async addUserToCall(req:express.Request){
        const auth = this.authenticateData(req)
        //console.log(auth)
        //console.log(req.body)
        if(auth.approved){
            const db = new MongoDB()
            const call =  await db.admCallAddClient(auth.id,req.body.email, req.query.id)
            return call
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }

    async removeUserFromCall(req:express.Request){
        const auth = this.authenticateData(req)
        //console.log(auth)
        //console.log(req.body)
        if(auth.approved){
            const db = new MongoDB()
            const call =  await db.admCallRemoveClient(auth.id,req.query.email, req.query.id)
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