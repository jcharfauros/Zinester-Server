const { Router } = require('express');
const { Comic } = require('../models')
const validateSession = require('../middleware/validate-session');

const router = Router();

// POST - /create
router.post('/create', validateSession, (req, res) => {
    Comic.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
        yearCreated: req.body.yearCreated,
        comicImg: req.body.comicImg,
        userId: req.user.id,                
    })
    .then((comic) => {
        res.status(200).json({
            message: 'Congratulation, the comic has been successfully added!',
            log: comic,
        });
    })
    .catch((err) => res.status(500).json({ err }));
});

//GET - User(author role)
router.get('/mycomics', validateSession, (req, res) => {
  
    Comic.findAll({
        where: { userId: req.user.id },
    })
    .then((comic) => res.status(200).json(comic))
    .catch((err) => res.status(500).json({ error: err }));  
})

//GET - all Zines (any user type, even unsigned up)
router.get('/', (req, res) => {
    Comic.findAll()
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }));
})

//PUT - update
router.put('/update/:comicId', validateSession, function(req, res) {
    const updateComic = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
        yearCreated: req.body.yearCreated,
        comicImg: req.body.comicImg,
        userId: req.user.id,
     
    };
    const query = { 
        where: { 
            id: req.params.comicId, 
            userId: req.user.id 
        }
    };
    
    Comic.update(updateComic, query)        
        .then((comic) => {
            res.status(200).json({
                message: 'The comic has been updated successfully!',
                log: comic,
            });
        })
        .catch((err) => res.status(500).json({ error: err }));
});

//DELETE
router.delete('/delete/:comicId', validateSession, function(req, res) {
    const query = {
        where: {
            id: req.params.comicId, 
            userId: req.user.id
        }
    };

    Comic.destroy(query).then(() => res
        .status(200)
        .json({ message: 'The Comic was removed from the database'})
    );
});

module.exports = router;