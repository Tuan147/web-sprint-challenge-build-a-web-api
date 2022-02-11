// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');

const { Router } = require('express');

const router = Router();

const { validateActionId, validateAction } = require('./actions-middlware');


router.get('/', (req, res) => {
    Actions.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error retrieving action'
            })
        })
});

// router.get('/:id', validateActionId, (req, res) => {
//     res.status(200).json(req.action)
//     Actions.findById(req.params.id)
//         .then(action => {
//             if (action) {
//                 res.status(200).json(action)
//             } else {
//                 next({
//                     status: 404,
//                     message: 'Action not found'
//                 })
//                 res.status(404).json({
//                     message: 'Action not found'
//                 })
//             }
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: 'Error retrieving action'
//             })
//         })
// });

router.get('/:id', validateActionId, async (req, res, next) => {
    try {
        res.status(200).json(req.action)
    } 
    catch (e) {
        res.status(404).json({
            message: 'Could not validate action ID'
        })
    }
})

router.post('/', validateAction, (res, req) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error adding the action'
            })
        })
});

router.put('/:id', validateActionId, validateAction, (res, req) => {
    const { name, description, completed } = req.body;
    Actions.update()
        .then(action => {
            Actions.update(req.params.id, req.body)
            if (!name || !description || !completed) {
                res.status(400).json({
                    message: 'Could not find action ID'
                })
            } else {
                res.json(action)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Could not find action'
            })
        })
});

router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
        .then(count => {
            if (count > 0 ) {
                res.status(200).json({
                    message: 'The action has been deleted'
                })
            } else {
                res.status(404).json({
                    message: 'The action could not be found'
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: 'Error removing the action'
            })
        })
});

module.exports = router;