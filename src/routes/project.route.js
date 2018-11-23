import express from 'express'
import ProjectController from './../controllers/project.controller'

const ProjectRoute = (app) => {
    const controller = ProjectController()

    const router = express.Router()

    router.get('/', controller.get)

    return router
}

export default ProjectRoute