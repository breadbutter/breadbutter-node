# Bread Butter Node.js

The official BreadButter Node.js Server library.

## Download

NPM
```
npm install breadbutter-nodejs --save
```

## Bread Butter API

- Prior to coding, some configuration is required at https://app.breadbutter.io/app/#app-settings.

- For the full Developer Documentation please visit: https://app.breadbutter.io/api/

---
### Instantiating a new client

- `APP_ID` can be found in [App Settings](https://app.breadbutter.io/app/#/app-settings)
- `APP_SECRET` is configured at [App Secrets](https://app.breadbutter.io/app/#/app-secrets)
- `BREADBUTTER_API_ENDPOINT` should be set to `https://api.breadbutter.io`

Create a new instance from `BreadButter`.  

```javascript
const client = require('breadbutter-nodejs')('APP_ID', 'APP_SECRETS', 'BREADBUTTER_API_ENDPOINT');
```

---
### Login QuickStart
The StartAuthentication function in the JS library begins the Bread Butter managed login process.
>Further documentation on starting the login process via our JavaScript client can be found at our GitHub page [here](https://github.com/BreadButter/BreadButter-js).

---
### Node.js Workflow
The following example demonstrates what to do once the `callback Url` has been used by our system to redirect the user back to your page:

```javascript
const client = require('breadbutter-nodejs')('APP_ID', 'APP_SECRETS', 'BREADBUTTER_API_ENDPOINT');

client.getAuthentication('AUTHENTICATION_TOKEN').then((response) => {
    console.log('Complete Authnetication:');
    console.log(response);
});
```