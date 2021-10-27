// const { validateSession } = require('../middleware');
const { Router } = require('express');
const { ReadingList } = require('../models');
const validateSession = require('../middleware/validate-session');
const router = Router();

// POST - /create
router.post('/create', validateSession, (req, res) => {
    ReadingList.create({
        title: req.body.title,
        userId: req.user.id        
    })
    .then((readinglist) => {
        res.status(200).json({
            message: 'Hooray, reading list has been created!',
            log: readinglist,
            // zineId: req.zine.id,
            // userId: req.user.id
        });
    })
    .catch((err) => res.status(500).json({ err }));
});

// GET - /readinglist


// PUT - /update


// DELETE - /delete