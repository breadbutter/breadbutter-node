const axios = require('axios');

let app_id = false;
let api_path = false;
let app_secret = false;

const generateRequests = function(url, method, data) {
    let headers = {
        'Accept': 'application/json'
    };
    if (app_secret) {
        headers['x-app-secret'] = app_secret;
    }
    let request = {
        url: api_path + url,
        headers: headers,
        method: method,
        maxRedirects: 0
    }
    if (data) {
        request['data'] = data;
    }
    return request;
};

const promisePost = function(url, data) {
    return new Promise(function(resolve, reject) {
        post(url, data).then(function(response) {
            resolve(response);
        }).catch(function(error) {
            resolve(error.response.data);
        })
    });
};

const promisePut = function(url, data) {
    return new Promise(function(resolve, reject) {
        post(url, data).then(function(response) {
            resolve(response);
        }).catch(function(error) {
            resolve(error.response.data);
        })
    });
};

const promiseGet = function(url, data) {
    return new Promise(function(resolve, reject) {
        get(url, data).then(function(response) {
            resolve(response);
        }).catch(function(error) {
            resolve(error.response.data);
        })
    });
};

const get = async function(url, data) {
    let res = await axios(generateRequests(url, 'get', data));
    let res_data = res.data;
    return res_data;
};

const post = async function(url, data) {
    let res = await axios(generateRequests(url, 'post', data));
    let res_data = res.data;
    return res_data;
};

const put = async function(url, data) {
    let res = await axios(generateRequests(url, 'put', data));
    let res_data = res.data;
    return res_data;
};

const redirect = function(url, data) {
    return new Promise(function(resolve, reject) {
        get(url, data).then(function(response) {
            console.log('no possible');
            reject(response);
        }).catch(function(error) {
            if (error.response.status == '302') {
                resolve({
                    url: error.response.headers.location
                });
            } else {
                reject(error);
            }
        })
    });
};

module.exports.setAppId = function(value) {
    if (value) {
        app_id = value;
    }
};

module.exports.setApiPath = function(value) {
    if (value) {
        api_path = value;
        if (api_path[api_path.length - 1] != '/') {
            api_path += '/';
        }
    }
};

module.exports.setAppSecret = function(value) {
    if (value) {
        app_secret = value;
    }
};

module.exports.ping = function() {
    const url = 'ping';
    return promiseGet(url);
};

module.exports.startAuthentication = function(data) {
    const url = `apps/${app_id}/authentications`;
    let request_data = {};
    data = data ? data : {};
    const fields = ['email_Address', 'auth_type', 'provider', 'user', 'options'];

    for(let key in data) {
        if (fields.indexOf(key) != -1) {
            request_data[key] = data[key];
        }
    }

    return promisePost(url, data);
};

module.exports.redirectAuthentication = function(token) {
    const url = `apps/${app_id}/authentications/${token}/redirect`;
    return redirect(url);
};

module.exports.getAuthentication = function(token) {
    const url = `apps/${app_id}/authentications/${token}`;
    return promiseGet(url);
};

// === following request requires the device_id


// module.exports.createEvent = function(data) {
//     const url = `apps/${app_id}/events`;
//     const request_data = {
//         code: data.code,
//         data: data.data
//     };
//     return promisePost(url, request_data);
// };
//
// module.exports.getClientSettings = function(email) {
//     let url = `apps/${app_id}/client_settings`;
//     let data = {};
//     if (email) {
//         data['email_address'] = email;
//     }
//     return promiseGet(url, data);
// };


