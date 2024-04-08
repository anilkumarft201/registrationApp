const express = require("express");
const router = express.Router();
const registerdb = require('../usermodel');
require('dotenv').config();

router.get("/", (req, res) => {
    return res.render('index');
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

    const { name, email, password, cnfpwd } = req.body;
    console.log(password);
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name == '') {
        return resp.render('index', { name_error: "Name must be entered" });
    }
    if (email == '') {
        return resp.render('index', { email_error: "Email Must be Entered" });
    }
    if (!email_pattern.test(email)) {
        return resp.render('index', { email_error: "Invalid Email Format" });
    }
    else if (password == '') {
        return resp.render('index', { pwd_error: "Password Must Be Entered" });
    }
    else if (cnfpwd == '') {
        return resp.render('index', { cnfpwd_error: "Confirm Password Must Be Entered" });
    }
    else if (password != cnfpwd) {
        return resp.render('index', { pwd_error: "Password and Confirm Password Must Be Same", cnfpwd_error: "Password and Confirm Password Must Be Same" });
    }
    else {
        let data = new registerdb(req.body);
        let exist = await registerdb.find({ "email": req.body.email })
        if (Array.isArray(exist) && exist.length > 0) {
            // resp.send({ message: "Email alreday exists" });
            return resp.render('index', { email_error: "Email Already Exist" });
        }
        else {
            let result = await data.save();
            // resp.send({ message: "Registered Succesfully" });
            return resp.render('deny', { message: "Registered Succesfully" });

        }
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

router.get("/ok", async (req, resp) => {
    return resp.redirect("/");
})
module.exports = router;