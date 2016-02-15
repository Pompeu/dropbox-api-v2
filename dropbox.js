'use strict';

const request = require('https').request;
const fs      = require('fs');
const Options = require('./options');

const Request = (options,data,callback) => {
  if(typeof data === 'function') {
    callback = data;
    data = '';
  }
  const opt = new Options(options);
  const req = request(opt,response);

  function response(res) {
    let body   = '';
    if (res.headers['content-type'] === 'application/json') {
      res.on('data', chunck =>  { 
        body += chunck.toString();
      }); 
    } else {
      const dropHeader = JSON.parse(res.headers['dropbox-api-result']);
      const name = `./${dropHeader.name}`;
      res.pipe(fs.createWriteStream(name));
      body = name;
    }

    res.on('end',() => callback(null,body));
    res.on('error', err => callback(err));
  }

  req.write(data);
  req.end();
};


module.exports = Request;
