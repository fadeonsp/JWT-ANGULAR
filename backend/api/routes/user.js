const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    mysqlConnection.query('select username,roleId from user', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.post('/singin', (req, res) => {
    const {userName, pass} = req.body;
    mysqlConnection.query   ('select * from user where username=? and pass=?', 
    [userName,pass],
    (err, rows, fields) => {
        if(!err) {
           if(rows.length > 0) {
            let data = JSON.stringify(rows[0]);
            const token = jwt.sign(data, 'stil');
            res.json({token})
           }
        }else {
            res.json('Usuário dados incorretos')
        }
    }
    )
})

router.post('/test', (req,res) => {
   
    res.json('Informação secreta')
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) return res.status(401).json('nao autorizado');

    const token = req.headers.authorization.substr(7)
    if(token!=='') {
        const content = jwt.verify(token, 'stil');
        req.data = content;
        next();
    } else {
        res.status(401).json('Token vazio');
    }
}

module.exports = router;