// add middlewares here related to projects
const Projects = require('./projects-model');

module.exports = {
    validateProjectId,
    validateProject
};

async function validateProjectId(req, res, next) {
    try {
        let id = result.params.id;
        let result = await Projects.findById(id)
        if (result == null) {
            res.status(404).json({
                message: 'The project could not be found'
            })
        } else {
            req.project = result
            next();
        }
    }
    catch (e) {
        res.status(500).json({
            message: 'Error finding project'
        })
    }
};

function validateProject(req, res, next) {
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

