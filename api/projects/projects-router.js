// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { Router } = require('express');

const router = Router();

const { validateProjectId, validateProject } = require('./projects-middleware');

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error retrieving projects'
            })
        })
});

router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                next({
                    status: 404,
                    message: 'Project not found', 
                })
                res.status(404).json({
                    message: 'Project not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error retrieving project'
            })
        })
});

router.post('/', validateProject, (res, req) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error adding the project'
            })
        })
});

router.put('/:id', validateProjectId, validateProject, (res, req) => {
    const { name, description, completed } = req.body;
    Projects.update()
        .then(project => {
            Projects.update(req.params.id, req.body)
            if (!name || !description || !completed) {
                res.status(404).json({
                    message: 'Could not find Project ID'
                })
            } else {
                res.json(project)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Could not find project'
            })
        })
});

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            if (count > 0 ) {
                res.status(200).json({
                    message: 'The project has been deleted'
                })
            } else {
                res.status(404).json({
                    message: 'The project could not be found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error removing the project'
            })
        })
});

router.get('/:id/actions', validateProjectId, validateProject, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(action => {
            if (action.length > 0 ) {
                res.status(200).json(action)
            } else {
                res.status(404).json({
                    message: 'Error with ID provided'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error adding post to ID'
            })
        })
});

module.exports = router;
