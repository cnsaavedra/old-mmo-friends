// change port whenever
module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'accounts',
        user: process.env.DB_USER || 'superUser',
        password: process.env.DB_PASS || '123456',
        options:{
            dialect: process.env.DIALECT || 'postgres',
            host: process.env.HOST || 'localhost'
        }
    }
}
