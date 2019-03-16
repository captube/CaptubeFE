## Preparation for runnning

In order to prepare for running, you should install necessary packages. <br>
In the project directory, you can run:


```bash
$ npm install
```

## Running dev server

In the project directory, you can run:

```bash
$ npm start
```

## Running Prod Server

First, you need to build source code for static resources. <br>
In the project directory, you can run:

```bash
$ npm run build
```

Once you succeed to build, you can deploy your own server using node.
Write down following nodejs script 

#### Start-Prod.js

```javascript
const express = require('express');
const logger = require('express-logger');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();

app.use(logger({path:'./log/logfile.log',format:':method + :date'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api',proxy({target:'http://localhost:4000'}));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080);
```

Finally,

```bash
$ node start_prod.js
```