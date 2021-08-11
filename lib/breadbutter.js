const _request = require('./request');

const BreadButter = function(app_id, app_secret, api_path) {
    if (!(this instanceof BreadButter)) {
        return new BreadButter(app_id, app_secret, api_path);
    }

    this._api = {
        app_id: null,
        app_secret: null,
        api_path: BreadButter.DEFAULT_API_PATH
    };

    this.IdentityProviders = require('./IdentityProviders');

    this.setAppId(app_id);
    this.setAppSecret(app_secret);
    this.setApiPath(api_path);

};

BreadButter.DEFAULT_API_PATH = 'https://api.breadbutter.io/';

BreadButter.prototype = {
    _setApiField(key, value) {
        this._api[key] = value;
    },
    setAppId(value) {
        this._setApiField('app_id', value);
        _request.setAppId(value);
    },
    setAppSecret(value) {
        this._setApiField('app_secret', value);
        _request.setAppSecret(value);
    },
    setApiPath(value) {
        this._setApiField('api_path', value);
        _request.setApiPath(value);
    },
    ping() {
        return _request.ping.apply(this, arguments);
    },
    getAuthentication() {
        return _request.getAuthentication.apply(this, arguments);
    },
    startAuthentication() {
        return _request.startAuthentication.apply(this, arguments);
    },
    redirectAuthentication() {
        return _request.redirectAuthentication.apply(this, arguments);
    }
};


module.exports = BreadButter;
module.exports.BreadButter = BreadButter;