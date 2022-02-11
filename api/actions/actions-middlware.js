// add middlewares here related to actions
const Actions = require('./actions-model');

module.exports = {
    validateActionId, 
    validateAction
};


async function validateActionId(req, res, next) {
    try {
        let id = result.params.id;
        let result = await Actions.findById(id)
        if (result == null) {
            res.status(404).json({
                message: 'The action could not be found'
            })
        } else {
            req.action = result
            next();
        }
    }
    catch (e) {
        res.status(500).json({
            message: 'Error finding action'
        })
    }
};

function validateAction(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !name.trim()) {
        res.status(404).json({
            message: 'Name is required'
        })
    } else if (!description || !description.trim()) {
        res.status(404).json({
            message: 'Description is required'
        })
    } else {
        req.name = name.trim();
        req.description = description.trim();
        req.completed = completed
        next()
    }
};
