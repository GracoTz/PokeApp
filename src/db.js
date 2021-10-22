const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pokemon'
});

const query = async (sql, values) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
};

module.exports = {connection, query};