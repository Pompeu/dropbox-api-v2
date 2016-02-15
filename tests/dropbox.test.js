'use strict';

const DropboxApi = require('../dropbox');
const assert     = require('assert');
const token      = require('./token.json').token;

describe('api drop box', function () {
  this.timeout(10000);

  describe('create folder', () => {
    it('expect crase a folder in dropbox ', done => {
      let data = JSON.stringify({'path': '/photos/test' });

      let header =  {
        path : '/2/files/create_folder',
        contentType : 'application/json',
        Authorization: token
      };

      DropboxApi(header, data, result);

      function result (err,data) {
        data = JSON.parse(data);
        assert.ok(!err, 'err is null');
        assert.ok(data !== null, 'data id not null');
        done();
      }
    });
  });

  describe('get list of folders', () => {
    it('expect get a list of folder from dropbox', done => {
      let data = JSON.stringify({'path': '/photos/sample_imgs', 'recursive': true });

      let header =  {
        path : '/2/files/list_folder',
        contentType : 'application/json',
        Authorization: token
      };

      DropboxApi(header, data, result);

      function result (err,data) {
        data = JSON.parse(data);
        assert.ok(!err, 'err is null');
        assert.ok(data !== null, 'data id not null');
        assert.ok(data.entries.length > 0,'len > 0');
        done();
      }
    });
  });

  describe('download images from dropbox', () => {
    it('expect get an image from content dropboxapi  ', done => {
      const imgName = 'costa_rican_frog.jpg';

      let opt =  {
        hostname : 'content.dropboxapi.com',
        path : '/2/files/download',
        Authorization: token,
        headerPath : `{\"path\":\"/photos/sample_imgs/${imgName}\"}`
      };

      DropboxApi(opt, result);

      function result(err,data) {
        assert.ok(err === null,'err is null');
        assert.ok(data !== null,'data exist');
        done();
      }
    });
  });

  describe('upload images to dropbox', () => {

    it('expect upload an image to content dropboxapi  ', done => {

      const data      = require('fs').readFileSync('./debian2.jpg');
      const bufferLen = Buffer.byteLength(data);
      const imgName   = 'debian.jpg';

      let opt =  {
        hostname : 'content.dropboxapi.com',
        path : '/2/files/upload',
        Authorization: token,
        contentType : 'application/octet-stream',
        contentLength : bufferLen,
        headerPath : `{\"path\": \"/photos/sample_imgs/${imgName}\",\"mode\": \"add\",\"autorename\": true,\"mute\": false}`
      };

      DropboxApi(opt,data,result);

      function result(err,data) {
        assert.ok(err === null,'err is null');
        assert.ok(data !== null,'data exist');
        done();
      }
    });
  });
});
