const express = require("express");
const router = express.Router();
const registerdb = require('../usermodel');
require('dotenv').config();

router.get("/", (req, res) => {
    res.render('index');
})

router.post("/create", async (req, resp) => {
    console.log("Request: ")
    console.log(req.body.name);
    let data = new registerdb(req.body);
    let exist = await registerdb.find({ "email": { $regex: req.body.email } })
    if (exist.length > 0) {
        resp.send({ message: "Email alreday exists" });
    }
    else {
        let result = await data.save();
        resp.send({ message: "Registered Succesfully" });
    }

})

router.post("/register", async (req, resp) => {
    let data = new registerdb(req.body);
    let exist = await registerdb.find({ "email": { $regex: req.body.email } })
    if (exist.length > 0) {
        // resp.send({ message: "Email alreday exists" });
        resp.render('deny',{message:"Email already exist"});
    }
    else {
        let result = await data.save();
        // resp.send({ message: "Registered Succesfully" });
        resp.render('deny',{message:"Registered Succesfully"});

    }

})

router.get("/show", async (req, res) => {
    let data = await registerdb.find();
    res.send(data);
});
router.delete("/delete/:_id", async (req, resp) => {
    console.log(req.params);
    let data = await registerdb.deleteOne(req.params);
    resp.send("done");
});
router.put("/update/:_id", async (req, resp) => {
    console.log(req.params);
    let data = await registerdb.updateOne(
        req.params, {
        $set: req.body
    }
    );
    resp.send(data);
});

router.get("/findmail", async (req, resp) => {
    let data = await registerdb.find({
        "$or": [
            { "email": { $regex: req.body.email } }
        ]
    })
    resp.send(data);
});

router.get("/search/:key", async (req, resp) => {
    let data = await registerdb.find({
        "$or": [
            { "name": { $regex: req.params.key } },
            { "email": { $regex: req.params.key } }
        ]
    })
    resp.send(data);
});


module.exports = router;