userSql = "CREATE TABLE IF NOT EXISTS user ( \
            uid VARCHAR(36) NOT NULL, \
            college VARCHAR(40), \
            email VARCHAR(30), \
            phone VARCHAR(20), \
            avatar VARCHAR(30), \
            grade INT, \
            wechat VARCHAR(20), \
            qq VARCHAR(15),\
            verify INT, \
            create_time DATETIME NOT NULL,\
            PRIMARY KEY (uid) \
) ENGINE=InnoDB DEFAULT CHARSET=utf8";

productSql = "CREATE TABLE `product` (\
    `pid` VARCHAR(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'product id',\
        `uid` VARCHAR(36)  COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户ID',\
            `title` VARCHAR(60) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品标题',\
                `desc` VARCHAR(800) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品表述',\
                    `o_price` DECIMAL(5, 2) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品原价',\
                        `s_price` DECIMAL(5, 2)  COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品售价',\
                            `time_d` DATETIME COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '下架时间',\
                                `time_u` DATETIME  COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '上架时间',\
                                    `p_type` INT  COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品类型',\
                                        `visit` INT NOT NULL,\
                                            `comments` INT NOT NULL,\
                                                PRIMARY KEY (`pid`),\
                                                    KEY`pid`(`pid`) USING BTREE\
)  ENGINE = InnoDB DEFAULT CHARSET= utf8mb4 COLLATE= utf8mb4_unicode_ci COMMENT= '商品';"

photoSql = "CREATE TABLE `photo` (\
    `fid` INT AUTO_INCREMENT,\
        `pid`  VARCHAR(100) NOT NULL,\
            `name` VARCHAR(50) NOT NULL,\
                `path` VARCHAR(100) NOT NULL,\
                    primary key(`fid`),\
                        foreign key(`pid`) references product(`pid`)\
) ENGINE = InnoDB DEFAULT CHARSET= utf8mb4 COLLATE= utf8mb4_unicode_ci COMMENT= '图片';";

commentSql = "CREATE TABLE IF NOT EXISTS comment (\
    p_uid VARCHAR(50) NOT NULL,\
    c_uid VARCHAR(50) NOT NULL,\
    body VARCHAR(512) NOT NULL,\
    p_pid INT NOT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8";

var model = {
    userSql:userSql,
    productSql: productSql,
    photoSql:photoSql,
    commentSql:commentSql
}

module.exports = model;
