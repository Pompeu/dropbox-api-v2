'use strict';

const request = require('./dropbox');

function Dropbox() {}

Dropbox.prototype.createFolder = options => {
  const header =  {
    path : '/2/files/create_folder',
    contentType : 'application/json',
    Authorization: options.token
  };

  let data = JSON.stringify({'path': options.folder});

  return new Promise((fulfilled, reject) => {
    request(header,data, (err, res) => {
      err? reject(err) : fulfilled(res);
    });
  });
};

Dropbox.prototype.getFolders = options => {
  const header =  {
    path : '/2/files/list_folder',
    contentType : 'application/json',
    Authorization: options.token
  };

  let data = JSON.stringify(
    {'path': options.folder, 'recursive': options.isRecurseve }
  );

  return new Promise((fulfilled, reject) => {
    request(header,data, (err, res) => {
      err? reject(err) : fulfilled(res);
    });
  });
};

Dropbox.prototype.download = options => {
  const imgName = options.fileName;

  let header =  {
    hostname : 'content.dropboxapi.com',
    path : '/2/files/download',
    Authorization: options.token,
    headerPath : `{\"path\":\"/photos/sample_imgs/${imgName}\"}`
  };

  return new Promise((fulfilled, reject) => {
    request(header,(err, res) => {
      err? reject(err) : fulfilled(res);
    });
  });

};

Dropbox.prototype.upload = options =>  {

  const data = options.buffer;
  const bufferLen = Buffer.byteLength(data);
  const path = `${options.folder}/${options.fileName}`;

  let header =  {
    hostname : 'content.dropboxapi.com',
    path : '/2/files/upload',
    Authorization: options.token,
    contentType : 'application/octet-stream',
    contentLength : bufferLen,
    headerPath : `{\"path\": \"${path}\",\"mode\": \"add\",\"autorename\": true,\"mute\": false}`
  };

  return new Promise((fulfilled, reject) => {
    request(header,data,(err, res) => {
      err? reject(err) : fulfilled(res);
    });
  });
};

module.exports = Dropbox;
