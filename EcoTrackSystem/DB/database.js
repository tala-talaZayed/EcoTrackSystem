const {createPool} =require("mysql");
//create connection with database using createPool Function
const pool = createPool({
  port : 3306,
  host: "localhost",
  user :"root",
  password : "", 
  database : "ecotracksystem" ,
  connectionLimit : 10   
});
//we reuse the connections there is no need to connect again and we will end the connections
module.exports = pool ; 

