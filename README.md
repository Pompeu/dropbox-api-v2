# dropbox-api-v2
dropbox-api-v2 wraper 


# Exemple
 
you can check testes for more exemples

```js

const dropbox = new Dropbox();
const options = {
  folder : 'add/your/folder',
  token : "Bearer your token here"
};

dropbox.createFolder(options)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
```
# Methods 

```js
    dropbox.createFolder(options);
    dropbox.getFolders(options);
    dropbox.download(options);
    dropbox.upload(options);
```

## Must See

Check tests for see all options.

You can se another options for use outhers endpoints of api.


## Testing

for run teste you will need create acount in dropbox,
and add your bearen key in tests/token.json

