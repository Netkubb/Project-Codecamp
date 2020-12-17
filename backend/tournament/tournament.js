const express = require('express');
const passport = require('passport');
const router = express.Router();
const _ = require('lodash');

const db = require('./../database/models');

router.get('/', async (req, res) => {
    tour = await db.tournament.findAll();
    res.send(tour);
});

const auth = passport.authenticate('a', { session: false })

router.get('/my', auth, async (req, res) => {
    const data = await db.user.findOne({ where: { id: req.user.id }, include: [db.tournament] });
    // console.log(data.tournaments);
    // const user = req.user
    // res.send(req.user.tour.data);
    res.send(data.tournaments)
});

router.post('/', async (req, res) => {
    let a = req.body;
    const data = { name: a.name, content: a.detail, contact: a.sites, image: a.img }
    await db.tournament.create(data);
    res.status(201).send("Created");
})

router.post('/my', auth, async (req, res) => {
    // let id = req.body.id;
    // let userdata = req.user.tour.data;
    // // console.log(userdata)
    // let indexuser = data.findIndex(x => x.id === req.user.id)
    // // console.log(indexuser)
    // let indextour = tour.findIndex(x => x.id === id)
    // let x = userdata.filter(x => x.id === id);
    // // console.log(x);
    // if (x.length > 0) {
    //     res.status(400).send("");
    // }
    // else {
    //     data[indexuser].tour.data.push(tour[indextour]);
    //     res.send("Added")
    // }
    const payload = { tournamentId: Number(req.body.id), userId: req.user.id }
    // console.log(payload)
    const data = await db.own.findOne({ where: payload });
    // console.log(data)
    if (data) {
        res.status(400).send("");
    }
    else {
        await db.own.create(payload);
        res.send("Added");
    }
})

router.delete('/my', auth, async (req, res) => {
    // let id = Number(req.query.id);
    // let userdata = req.user.tour.data
    // let a = userdata.filter(x => Number(x.id) !== id);
    // let indexuser = data.findIndex(x => x.id === req.user.id)
    // data[indexuser].tour.data = a;
    // res.send("Deleted");
    await db.own.destroy({ where: { userId: req.user.id, tournamentId: Number(req.query.id) } });
    res.send("Deleted")
})

module.exports = router;