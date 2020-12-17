const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('./../database/models');
const bcrypt = require('bcryptjs');

// router.get('/:name',(req,res)=>{
//     console.log(req.params.name);
//     console.log("/user/name is requested")
//     const a = data.filter(x => x.name===req.params.name);
//     res.send(a);
// });

router.post('/login', async (req, res) => {
    // console.log(req.body)
    const a = req.body;
    const data = await db.user.findOne({ where: { username: a.user } });
    console.log(data.password);
    if (!data) {
        res.send({ err: true, message: "Username or Password is incorrect" });
    }
    else {
        const checkPass = bcrypt.compareSync(a.pass, data.password);
        if (checkPass) {
            const payload = {
                id: data.id,
                name: data.name
            };
            const token = await jwt.sign(payload, 'Netkubb', { expiresIn: 3600 });
            res.send({ err: false, token: token })
        }
        else {
            res.send({ err: true, message: "Username or Password is incorrect" })
        }
    }
    // let x = data.filter(x => x.username === a.user && x.password === a.pass);
    // // console.log(x);
    // if (x.length === 0) {
    //     res.send({ err: true, message: "Username or Password is incorrect" });
    // }
    // else {
    //     x = x[0];
    //     const payload = {
    //         id: x.id,
    //         name: x.name
    //     }
    //     // console.log(payload);
    //     const token = jwt.sign(payload, "Netkubb", { expiresIn: 3600 });
    //     // console.log(token);
    //     res.status(200).send({ token: token, message: "Login successful" });
    // }
})

router.post('/register', async (req, res) => {
    // console.log(req.body);
    // res.send("Hey");
    let a = req.body;
    const data = await db.user.findOne({ where: { username: a.user } })

    if (data) {
        res.send({ err: true, message: "Username already exist" })
    }
    else {
        const salt = bcrypt.genSaltSync(12);
        const pass = bcrypt.hashSync(req.body.pass, salt);
        const d = { username: req.body.user, password: pass, name: req.body.name };
        await db.user.create(d)
        res.send({ err: false });
        console.log("Created");
    }
});

module.exports.router = router;