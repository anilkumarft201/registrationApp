const http=require('http');
const app=require('./index');
require('dotenv').config();

const server=http.createServer(app);
server.listen(process.env.PORT,process.env.HOST,(error)=>{
    if(!error)
        console.log(`Server is running succesfully at port number http://localhost:3000`);
    else
        console.log("Server Initilzation is failed :"+error);
});