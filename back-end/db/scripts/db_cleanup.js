var DB_Name = db; //

var dbInst = db.getSiblingDB(DB_Name);

var output;

output = dbInst.users.remove({});
printjson(output);/*globals printjson, db*/

output = dbInst.expenses.remove({});
printjson(output);/*globals printjson, db*/ 