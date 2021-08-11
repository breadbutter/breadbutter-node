const providers = ["microsoft","google","facebook","linkedin","okta","slack","twitter","github","quickbooks","onelogin","apple","basecamp","dropbox","dwolla","fitbit","goodreads","echoidp","planningcenter","shopify","yammer","wordpress","yahoo","pingone","twitch","foursquare","amazon","uber","duo","wix","salesforce","spotify","withings","discord","bitbucket","strava","instagram","paypal","keycloak","local"];
let data = {};
for(let i = 0; i < providers.length; i++) {
    let key = providers[i].toUpperCase();
    let val = providers[i].toUpperCase();
    data[key] = val;
}
module.exports = data;