import express = require('express');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import cors = require('cors');
require('dotenv').config()


import signup from './api/accounts/signup';
import login from './api/accounts/login';
import session from './api/accounts/session';
import calls, {createCall, joinCall, moderateCall, listUsersCall} from './api/calls';
import callInfo, {editCall} from './api/calls/adm';
import getUsers, {updateUser, changeUserPassword, deleteUser, checkEmail} from './api/accounts/adm'


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())

const port = process.env.PORT || 5000;

app.post('/api/signup', signup);

app.post('/api/login', login);

app.get('/api/session', session);

app.get('/api/calls', calls)
app.get('/api/calls/mycalls', listUsersCall)
app.post('/api/calls', createCall)

app.post('/api/call/join', joinCall)
app.post('/api/call/moderate', moderateCall)

app.get('/api/adm/users',getUsers)
app.get('/api/adm/validate',checkEmail)
app.put('/api/adm/user', updateUser)
app.put('/api/adm/user/password', changeUserPassword)
app.delete('/api/adm/user',deleteUser)

app.get('/api/adm/call',callInfo)
app.put('/api/adm/call',editCall)



app.listen(port, () => console.log(`Listening on port ${port}`));
