var config = {
    appid:'wx11b005672c39c105',
    secret:'531f031292c6e733085f19efc62118e7',
    port:5757,
    expires:24 * 3600,
    sessionTable:"session",
    userTable:"user",
    productTable:"product",
    photoTable:"photo",
    commentTable:"comment",
    cos:{
        region:"ap-guangzhou",
        fileBucket:"campus-service-1256014102"
    },
    mysql:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'root',
        database:'campus_service',  
        charset: 'utf8mb4'
    }
}

module.exports = config;