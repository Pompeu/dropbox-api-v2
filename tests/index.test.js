'use strict';

const assert  = require('assert');
const token   = require('./token.json').token;
const Dropbox = require('../index');

describe('gel folder', function() {
  this.timeout(10000);

  it('dropbox is exist', () => {
    const dropbox =  new Dropbox();
    assert.ok(dropbox);
  });

  it('dropbox has method createFolder', () => {
    const dropbox = new Dropbox();
    assert.ok(typeof dropbox.createFolder === 'function');
  });

  it('dropbox createFolder is a promise', done => {
    const dropbox =  new Dropbox();

    const options = {
      folder : '/photos/sample_imgs/test',
      token : token
    };

    let promise = dropbox.createFolder(options);
    assert.ok(typeof promise.then === 'function');
    assert.ok(typeof promise.catch === 'function');
    promise.then(data => {
      assert.ok(data !== null, 'result is exist');
      done();
    });
  });


  it('dropbox has method getFolders', () => {
    const dropbox = new Dropbox();
    assert.ok(typeof dropbox.getFolders === 'function');
  });

  it('dropbox getFolders is a promise', done => {
    const dropbox =  new Dropbox();
    const options = {
      folder : '/photos/sample_imgs',
      isRecursive : true,
      token : token
    };

    let promise = dropbox.getFolders(options);
    assert.ok(typeof promise.then === 'function');
    assert.ok(typeof promise.catch === 'function');
    promise.then(data => {
      assert.ok(data !== null, 'result is exist');
      done();
    });
  });

  it('dropbox has method download ', () => {
    const dropbox = new Dropbox();
    assert.ok(typeof dropbox.download === 'function');
  });

  it('dropbox download is a promise', done => {
    const dropbox =  new Dropbox();
    const options = {
      folder : '/photos/sample_imgs',
      token : token,
      fileName : 'costa_rican_frog.jpg'
    };

    let promise = dropbox.download(options);
    assert.ok(typeof promise.then === 'function');
    assert.ok(typeof promise.catch === 'function');

    promise.then(data => {
      assert.equal(data, './'+options.fileName);
      assert.ok(data !== null, 'result is exist');
      done();
    });
  });

  it('dropbox api has method upload', () => {
    const dropbox = new Dropbox();
    assert.ok(typeof dropbox.upload === 'function');
  });

  it('dropbox upload is a promise', done => {

    const buffer = require('fs').readFileSync('./costa_rican_frog.jpg');
    const dropbox =  new Dropbox();
    const options = {
      folder : '/photos/sample_imgs',
      token : token,
      buffer : buffer,
      fileName : 'frog.jpg' 
    };

    let promise = dropbox.upload(options);
    assert.ok(typeof promise.then === 'function');
    assert.ok(typeof promise.catch === 'function');

    promise.then(data => {
      data = JSON.parse(data);
      assert.ok(data !== null, 'result is exist');
      const len = Object.keys(data).length;
      assert.ok(len === 7, 'result ok with 7 keys');
      done();
    });
  });

});
