var apiOptions = {
    server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://giamp-loc8r-gettingmean.herokuapp.com';
}

module.exports = apiOptions;