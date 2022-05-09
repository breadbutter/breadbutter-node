## The official Node.js server library for Bread & Butter
This library allows you to connect your application to the authentication process of Bread & Butter. A user will be redirected to your application when a user is authenticated. Once this authentication is retrieved by your application you can perform an action like creating a user in your system or creating a session for that users.

### Installation
```
npm install breadbutter-nodejs --save
```
## API
>For more information on the full **DIY Quick Start Guide** visit https://app.breadbutter.io/api/

Once the user's authentication is processed on by Bread & Butter, the user is redirected to a callback interface defined in your Bread & Butter app. The example below is a simple interface that accepts the request from Bread & Butter and processes the authentication.

> After the the interface is created you will need to update the Callback URL with the URL to this interface in your app settings here: https://app.breadbutter.io/app/#/app-settings

### Processing an authentication request

*Create a new instance from `BreadButter`.*

- `APP_ID` can be found in https://app.breadbutter.io/app/#/app-settings
- `APP_SECRET` is configured at https://app.breadbutter.io/app/#/app-settings

```javascript
const client = require('breadbutter-nodejs')('APP_ID', 'APP_SECRETS');
```

*Retrieve authentication from Bread & Butter server*

> You can find the detailed API response here: https://breadbutter.io/api/server-api/

```javascript
//NOTE: This could be different based on what server you are using.
// If you are using Express
const authToken = req.query.authentication_token;

client.getAuthentication(authToken).then((response) => {
    const authData = response.auth_data;

    const emailAddress = authData.email_address;
    const firstName = authData.first_name;
    const lastName = authData.last_name;
    const profileImage = authData.profile_image_url;
});

//Use information above to create user in your system, create a session, etc
```

*Redirect the user back to your website*

```javascript
//NOTE: This could be different based on what server you are using.
//If you are using Express
app.use(function(req, res) {
    const authToken = req.query.authentication_token;
    client.getAuthentication(authToken).then((response) => {
        const authData = response.auth_data;

        const destinationURL = response.options.destination_url;
        res.redirect(destinationURL);

        // For plain solution:
        // res.writeHead(301, {
        //     Location: destinationURL
        // }).end();
    });
});
```