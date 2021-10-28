const { Router } = require('express');
const { ReadingList, Zine } = require('../models');
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
        });
    })
    .catch((err) => res.status(500).json({ err }));
});

// GET - User's reading lists
router.get('/mylist', validateSession, (req, res) => {
    ReadingList.findAll({
        where: { userId: req.user.id },
    })
    .then((readinglist) => res.status(200).json(readinglist))
    .catch((err) => res.status(500).json({ error: err })); 
})

// PUT - update
router.put('/update/:readinglistId', validateSession, function(req, res) {
    const updateReadingList = {
        title: req.body.title,
        userId: req.user.id
    };
    const query = {
        where: {
            id: req.params.readinglistId,
            userId: req.user.id
        }
    };
    ReadingList.update(updateReadingList, query)
        .then((readinglist) => {
            res.status(200).json({
                message: 'The reading list has been updated.',
                log: readinglist,
            });
        })
        .catch((err) => res.status(500).json({ error: err }));
});

// DELETE
router.delete('/delete/:readinglistId', validateSession, function(req, res) {
    const query = {
        where: {
            id: req.params.readinglistId,
            userId: req.user.id
        }
    };
    ReadingList.destroy(query).then(() => res
        .status(200)
        .json({ message: 'The reading list was removed from the database'})
    );
});

module.exports = router;