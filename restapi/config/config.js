const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9999,
        dbURL:'mongodb+srv://mraykova:maria123@cluster0.qlvbe.mongodb.net/eshop?retryWrites=true&w=majority',
        authCookieName: 'x-auth-token'
    },
    production: {}
};

module.exports = config[env];