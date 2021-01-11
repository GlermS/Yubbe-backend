import LoginAuthentication from "../validation/login-authentication";
import express = require('express');

class LoginHandler{
    authenticateData(req: express.Request){
        const {email, password} =req.body;
        const authenticator = new LoginAuthentication();
        return authenticator.authenticate(email, password)
    }   
}
export default LoginHandler;