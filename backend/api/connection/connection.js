const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'angular',
    port: '8889'
});

mysqlConnection.connect( err => {
    if(err) {
        console.log('Erro no banco', err);
        return;
    } else {
        console.log('banco ok')
    }
});
module.exports = mysqlConnection;