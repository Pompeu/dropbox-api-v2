'use strict';

function Options(opt) {
  if(!opt.hostname) {
    this.headers = {
      'Content-Type'  : opt.contentType,
      'Authorization' : opt.Authorization
    };
  } else if(opt.contentLength) {
    this.headers = {
      'Authorization'   : opt.Authorization,
      'Dropbox-API-Arg' : opt.headerPath,
      'Content-Type'    : opt.contentType,
      'Content-Length'  : opt.contentLength
    }; 
  } else if(opt.headerPath) {
    this.headers = {
      'Authorization' : opt.Authorization,
      'Dropbox-API-Arg': opt.headerPath
    }; 
  }

  this.hostname = opt.hostname ||'api.dropboxapi.com'; 
  this.port = opt.port || 443;
  this.path = opt.path;
  this.method = 'POST';

  return this;
}

module.exports = Options;
