var express = require('express');
var app = express();
var sql = require("mssql");
var sqlConfig = {
    user: 'sa',
    password: 'Y10@ee466',
    server: 'GRAPHENEB006',
    database: 'mmk',
    options: {
        encrypt: false
    }
};
app.get('/getEmployees', function (req, res) {
    sql.close();
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.query('select * from employee', function(err, recordset) {
            if(err) console.log(err);
            console.log("1 called");
            res.send(JSON.stringify(recordset.recordset)); // Result in JSON format
        });
    });
});

app.get('/getEmployees/:id',function(req,res){
    sql.close();
    sql.connect(sqlConfig,function(){
        var request = new sql.Request();
        request.query('select * from employee where eid='+req.params.id,function(err,recordset){
            if(err) console.log(err);
            console.log("2 called");
            res.end(JSON.stringify(recordset));
        });
    });
});

//Execute a stored procedure with one parameter 

app.get('/getEmployeesById/:id', function (req, res) {
    sql.close();
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.input('eid', req.params.id);
        request.execute('USP_EMPLOYEE_INFO_GET', function(err, recordset, returnValue, affected) {
            if(err) console.log(err);
            console.log("3 called");
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });
});

app.get('/getEmployeesByName/:name', function (req, res) {
    sql.close();
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.input('ename', req.params.name);
        request.execute('USP_EMPLOYEE_BY_NAME_GET', function(err, recordset, returnValue, affected) {
            if(err) console.log(err);
            console.log("4 called");
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });
});

app.get('/getAllTables',function(req,res){
    sql.close();
    sql.connect(sqlConfig,function(){
        var request = new sql.Request();
        request.query('select table_name from information_schema.tables',function(err,recordset){
            if(err) console.log(err);
            console.log("5 called");
            res.end(JSON.stringify(recordset));
        });
    });
});

// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});
