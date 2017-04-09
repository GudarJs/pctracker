module.exports = {
    host: process.env.HOST || '127.0.0.1',
    expressport: process.env.EXPRESSPORT || 3000,
    port: process.env.PORT || 1811,
    db: process.env.MONGODB || 'mongodb://localhost:27017/pctracker',
};