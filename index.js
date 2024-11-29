const path = require('path');
const express = require('express');

var mysql = require('mysql2');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
console.log(__dirname);

app.set('views', path.join(__dirname, 'views'));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "banking",
});
app.get('/list', (req, res) => {


    con.connect(function(err) {
        if (err) throw err;
        var sql = "select * from bank";
        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
        });
    });


});

app.get('/delete/:id', function(req, res) {
    const m = req.params.id;
    console.log(m);
    let sql = "DELETE FROM bank WHERE id=" + m;
    let query = con.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/list');
    });
});

app.post('/update', (req, res) => {
    let sql = "UPDATE bank SET name='" + req.body.name + "', price=" + req.body.price + " WHERE id=" + req.body.id;
    console.log(sql);
    let query = con.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/list');
    });
});

app.listen(4000, () => {
    console.log('Server is running at port 8000');
});