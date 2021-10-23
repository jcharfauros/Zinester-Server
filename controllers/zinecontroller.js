// let express = require('express');
// let router = express.Router();
const { Router } = require('express');
const { Zine } = require('../models/zine')
const sequelize = require('../db');
const validateSession = require('../middleware/validate-session');

const router = Router();

//add/create Zine
router.post('/create', validateSession, (req, res) => {
    Zine.create({
        title: req.body.zine.title,
        author: req.body.zine.author,
        description: req.body.zine.description,
        category: req.body.zine.category,
        yearCreated: req.body.zine.yearCreated,
        zineImg: req.body.zine.zineImg,        
    })
    .then((zine) => {
        res.status(200).json({
            message: 'Zine has been added to the Zinester DB',
            log: zine,
        });
    })
    .catch((err) => res.status(500).json({ err }));
});

//update Zine

//delete Zine

module.exports = router;