// change port whenever
module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'accounts',
        user: process.env.DB_USER || 'useracc',
        password: process.env.DB_PASS || '123456',
        options:{
            dialect: process.env.DIALECT || 'postgres',
            host: process.env.HOST || 'localhost',
            // change back to 5433 if on desktop
            // 5432 if on laptop
            port: '5432'
        }
    },
    authentication: {
        // used for signing jwt token, need a secret string.
        // secret is only known by server
        // used to determine if jwt token is valid or not
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
