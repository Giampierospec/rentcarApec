var apiOptions = {
    server: 'http://127.0.0.1:3000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = process.env.SERVER_URI;
}

module.exports = apiOptions;