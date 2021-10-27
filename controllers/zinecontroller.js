const { Router } = require('express');
const { Zine } = require('../models');
const validateSession = require('../middleware/validate-session');

const router = Router();

//add/create Zine
router.post('/create', validateSession, (req, res) => {
    Zine.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
        yearCreated: req.body.yearCreated,
        zineImg: req.body.zineImg,
        userId: req.user.id        
    })
    .then((zine) => {
        res.status(200).json({
            message: 'Congratulation, the zine has been successfully added!',
            log: zine,
        });
    })
    .catch((err) => res.status(500).json({ err }));
});

//get all Zine - by User
router.get('/myzines', validateSession, (req, res) => {
  
    Zine.findAll({
        where: { userId: req.user.id },
    })
    .then((zine) => res.status(200).json(zine))
    .catch((err) => res.status(500).json({ error: err }));  
})

//get all Zines in db - does not need to be a reg. user.
router.get('/', (req, res) => {
    Zine.findAll()
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }));
})

//update Zine
router.put('/update/:zineId', validateSession, function(req, res) {
    const updateZine = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
        yearCreated: req.body.yearCreated,
        zineImg: req.body.zineImg,
        userId: req.user.id        
    };
    const query = { 
        where: { 
            id: req.params.zineId, 
            userId: req.user.id 
        }};
    
    Zine.update(updateZine, query)
        .then((zine) => res.status(200).json(zine))
        .catch((err) => res.status(500).json({ error: err }));
});

//delete Zine
router.delete('/delete/:zineId', validateSession, function(req, res) {
    const query = {
        where: {
            id: req.params.zineId, 
            userId: req.user.id
        }
    };

    Zine.destroy(query).then(() => res
        .status(200)
        .json({ message: 'The Zine was removed from the database'})
    );
});

module.exports = router;