import express = require('express');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import cors = require('cors');


import signup from './api/accounts/signup';
import login from './api/accounts/login';
import session from './api/accounts/session';
import calls from './api/calls';


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


app.listen(port, () => console.log(`Listening on port ${port}`));
