let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'https://bit-picker-io.herokuapp.com';
        break;
    case 'bit-picker-io.herokuapp.com':
        APIURL = 'https://bit-picker-io.herokuapp.com/'
}

export default APIURL;