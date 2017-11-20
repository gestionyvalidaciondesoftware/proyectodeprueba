var oracledb = require('oracledb');

connectionString = {
	user: "cod20141020036",
	password: "20141020036",
	connectString: "localhost/xe"
};

function error(err, rs, cn){
	if(err){
		console.log(err.message);
		rs.contentType('application/json').status(500);
		rs.send(err.message);
		if(cn!=null) close(cn);
		return -1;
				
	} else {
		return 0;
	}

}

function open(sql, binds, dml, rs){

	oracledb.getConnection(connectionString, function(err,cn){

		if(error(err,rs,null)==-1) return;
		cn.execute(sql, binds, {autocommit: dml}, function(err,result){
			if(error(err,rs,cn)==-1) return;
			rs.header('Access-Control-Allow-Origin', '*'); 
  			rs.header('Access-Control-Allow-Methods', 'GET, POST');
  			rs.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
			rs.contentType('application/json').status(200);
			console.log(sql)
			console.log(result.metaData);
			if(dml){
				rs.send(JSON.stringify(result.rowsAffected));
			}else{
				rs.send(JSON.stringify(result.rows));
			}
		});
	})

}


function close(cn){

	cn.release(
			function(err){
				if(err) {console.error(err.message);}
			}
		);

}

exports.open = open;
exports.close = close;