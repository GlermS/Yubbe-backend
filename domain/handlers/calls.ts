import express = require('express');
import MongoDB from "../database/DB/mongodb/mongodb";
import TokenAuthenticator from "../validation/token-authentication";

class CallsHandler{
    async listCalls(req:express.Request){
        const auth = this.authenticateData(req)
        if(auth.approved){
            const db = new MongoDB()
            const calls =  await db.listCalls()
            return {authorized:true, calls: calls}
        }else{
            return {authorized:false}
        }
        

    }
    authenticateData(req: express.Request){
        const authenticator = new TokenAuthenticator();
        return authenticator.verifyToken(req)
    } 
}

export default CallsHandler;