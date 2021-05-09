let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':

    APIURL = 'http://localhost:3000';
    break;

    case 'careshareinfant-client.herokuapp.com':

    APIURL = 'https://careshareinfant-server-shawes.herokuapp.com'
}

export default APIURL;
