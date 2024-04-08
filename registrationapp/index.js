const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const bodyParser=require('body-parser');
const path=require('path');

require('./connection');
const registerdb = require('./usermodel');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

app.set('view engine','ejs');
//app.set('views',path.join(__dirname,'views'));
// app.get("/",(req,res)=>{
//     console.log(req.body);
//     res.render('index');
// })

app.use("/", userRouter);
app.use(express.static("views"));

// app.post("/create",async (req,resp)=>{
//     console.log(req.body);
//     let data=new registerdb(req.body);
//     let result=await data.save();
//     resp.send(result);
// })
// app.get("/show",async(req,res)=>{
//     let data=await registerdb.find();
//     res.send(data);
// });
// app.delete("/delete/:_id",async(req,resp)=>{
//     console.log(req.params);
//     let data=await registerdb.deleteOne(req.params);
//     resp.send("done");
// });
// app.put("/update/:_id",async(req,resp)=>{
//     console.log(req.params);
//     let data=await registerdb.updateOne(
//         req.params,{
//             $set:req.body
//         }
//     );
//     resp.send(data);
// });

// app.get("/search/:key",async(req,resp)=>{
//     let data=await registerdb.find({
//         "$or":[
//             {"name":{$regex:req.params.key}},
//             {"email":{$regex:req.params.key}}
//         ]
//     })
//     resp.send(data);
// });

// app.listen(3000,(error)=>{
//     if(!error)
//         console.log("Server is running ");
//     else
//         console.log("Error "+error)
// });

app.use(function (req, resp, next) {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
});


module.exports = app;