var config = {
    appid:'wx11b005672c39c105',
    secret:'531f031292c6e733085f19efc62118e7',
    port:5757,
    expires:24 * 3600,
    sessionTable:"session",
    cos:{
        region:"",
        fileBucket:""
    },
    mysql:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'sysuygm1234',
        database:'campus_service',  
        charset: 'utf8mb4'
    }
}

module.exports = config;