import express from 'express'
import ProjectController from './../controllers/project.controller'

const ProjectRoute = (app) => {
    const controller = ProjectController()

    const router = express.Router()

    router.get('/', controller.query)
    router.get('/:projectId', controller.get)
    router.post('/', controller.create)
    router.put('/:projectId', controller.update)
    router.delete('/:projectId', controller.delete)

    return router
}

export default ProjectRoute