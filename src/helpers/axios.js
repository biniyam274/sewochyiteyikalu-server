
const  axios = require('axios')

const instance = axios.create();

instance.interceptors.request.use(function (config) {
    let {url} = config
    // Do something before request is sent
    switch (url) {
        case 'https://movie-database-imdb-alternative.p.rapidapi.com/':
            config.headers['x-rapidapi-key'] = 'b04bd30c4dmsha2b719ee16b744fp100b3ajsn857e55eedc50'
            config.headers['x-rapidapi-host'] = 'movie-database-imdb-alternative.p.rapidapi.com'
            break;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

module.exports =  instance;