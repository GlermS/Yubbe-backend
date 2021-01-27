import express = require('express');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import cors = require('cors');
require('dotenv').config()


import signup from './api/accounts/signup';
import login from './api/accounts/login';
import session from './api/accounts/session';
import calls, {createCall, joinCall, moderateCall, listUsersCall} from './api/calls';
import callInfo, {editCall, deleteCall,addUserToCall, removeUserFromCall} from './api/calls/adm';
import getUsers, {updateUser, changeUserPassword, deleteUser, checkEmail} from './api/accounts/adm'
import createTheme, { updateTheme } from './api/themes/adm'
import getThemeInfo, { listThemes } from './api/themes';


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

app.post('/api/call/join', joinCall)
app.post('/api/call/moderate', moderateCall)

app.get('/api/adm/users',getUsers)
app.get('/api/adm/validate',checkEmail)
app.put('/api/adm/user', updateUser)
app.put('/api/adm/user/password', changeUserPassword)
app.delete('/api/adm/user',deleteUser)

app.post('/api/adm/calls', createCall)
app.post('/api/adm/call/client', addUserToCall)
app.delete('/api/adm/call/client', removeUserFromCall)
app.get('/api/adm/call',callInfo)
app.put('/api/adm/call',editCall)
app.delete('/api/adm/call',deleteCall)

app.post('/api/adm/theme',createTheme)
app.put('/api/adm/theme',updateTheme)
app.get('/api/adm/theme',getThemeInfo)
app.get('/api/adm/themes',listThemes)



app.listen(port, () => console.log(`Listening on port ${port}`));
