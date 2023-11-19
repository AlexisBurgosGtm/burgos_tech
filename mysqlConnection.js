var mysql = require('mysql');

  const config = {
    connectionLimit : 1000,
    host            : 'mysql5045.site4now.net',
    user            : 'a6478c_burgost',
    password        : 'razors1805',
    database        : 'db_a6478c_burgost',
    multipleStatements: true,
    max_user_connections:1000
  };

let execute = {
    query:(qry,res)=>{
        
      var connection = mysql.createConnection(config);
          
          connection.connect();
          
          connection.query(qry, function (error, results, fields) {
            if(error){
                res.send(error);
            }else{
                res.json(results);
            }
          });
          
          connection.end();
     
    },
    update_correlativo_silent:(qry)=>{
        
      var connection = mysql.createConnection(config);
          
          connection.connect();
          
          connection.query(qry, function (error, results, fields) {
            if(error){
                console.log(error);
            }else{
                console.log(results);
            }
          });
          
          connection.end();
     
    }
}

module.exports = execute;