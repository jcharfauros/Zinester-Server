const { Router } = require('express');
const { Zine2 } = require('../models');
const validateSession = require('../middleware/validate-session');

const router = Router();

//POST - create 
router.post('/create', validateSession, (req, res) => {
    Zine2.create({
        zineTwo: req.body.zineTwo,
        hasRead: req.body.hasRead,
        // readinglistId: req.readinglist.id,
        userId: req.user.id        
    })
    .then((zine2) => {
        res.status(200).json({
            message: 'Zine info has been successfully added',
            log: zine2,
        });
    })
    .catch((err) => res.status(500).json({ err }));
});



module.exports = router;