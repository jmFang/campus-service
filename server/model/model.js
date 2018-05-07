userSql = "CREATE TABLE IF NOT EXISTS user ( \
            uid VARCHAR(36) NOT NULL, \
            college VARCHAR(40), \
            email VARCHAR(30), \
            phone VARCHAR(20), \
            avartar VARCHAR(30), \
            grade INT, \
            wechat VARCHAR(20), \
            qq VARCHAR(15),\
            verify INT, \
            create_time DATETIME NOT NULL,\
            PRIMARY KEY (uid) \
) ENGINE=InnoDB DEFAULT CHARSET=utf8";

productSql = "CREATE TABLE IF NOT EXISTS product (\
    pid INT AUTO_INCREMENT,\
    uid VARCHAR(36) NOT NULL,\
    title VARCHAR(60) NOT NULL,\
    desc VARCHAR(800) NOT NULL,\
    o_price DECIMAL(5,2) NOT NULL,\
    s_price DECIMAL(5,2) NOT NULL,\
    time_d DATETIME NOT NULL,\
    time_u DATETIME NOT NULL,\
    type INT, NOT NULL,\
    visit INT NOT NULL,\
    PRIMARY KEY (pid)\
) ENGINE=InnoDB DEFAULT CHARSET=utf8";

photoSql = "CREATE TABLE IF NOT EXISTS photo (\
    fid INT AUTO_INCREMENT,\
    pid INT NOT NULL,\
    name VARCHAR(30) NOT NULL,\
    path VARCHAR(50) NOT NULL,\
    PRIMARY KEY (fid)\
) ENGINE=InnoDB DEFAULT CHARSET=utf8";

commentSql = "CREATE TABLE IF NOT EXISTS comment (\
    p_uid VARCHAR(36) NOT NULL,\
    c_uid VARCHAR(36) NOT NULL,\
    body VARCHAR(120) NOT NULL,\
    p_pid INT NOT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8";

var model = {
    userSql:userSql,
    productSql: productSql,
    photoSql:photoSql,
    commentSql:commentSql
}

module.exports = model;