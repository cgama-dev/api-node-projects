import Project from './../models/project.models'
import Task from '../models/task.models';

const ProjectController = () => {

    const Controller = {
        query: async (req, res) => {
            try {
                const projects = await Project.find().populate(['user', 'task'])

                return res.send({ projects })

            } catch (err) {

                return res.status(400).send({ error: 'Erro ao listar projetos' })
            }

        },
        get: async (req, res) => {
            const projectId = req.params.projectId

            try {
                const project = await Project.findById(projectId).populate('user')

                if (!project)
                    return res.status(400).send({ error: 'Esse projeto não existe na base de dados' })

                return res.send({ project })

            } catch (err) {
                return res.status(400).send({ error: 'Erro ao buscar projeto' })
            }

        },
        create: async (req, res) => {
            try {

                const { title, description, tasks } = req.body

                const project = await Project.create({ title, description, user: req.userId })

                await Promise.all(tasks.map(async task => {
                    const projectTask = new Task({ ...task, project: project._id })

                    const newTask = await projectTask.save()

                    project.tasks = [...project.tasks, newTask]

                }))

                await project.save()

                return res.send({ project })

            } catch (err) {
                return res.status(400).send({ error: ' Erro ao criar projeto' })
            }
        },
        update: async (req, res) => {
            const projectId = req.params.projectId
            try {

                const { title, description, tasks } = req.body

                const project = await Project.findByIdAndUpdate({ _id: projectId }, {
                    title,
                    description
                }, { new: true })

                project.tasks = []

                await Task.remove({ project: projectId })

                await Promise.all(tasks.map(async task => {
                    const projectTask = new Task({ ...task, project: project._id })

                    const newTask = await projectTask.save()

                    project.tasks = [...project.tasks, newTask]

                }))

                await project.save()

                return res.send({ project })

            } catch (err) {
                return res.status(400).send({ error: ' Erro ao atualizar projeto' })
            }
        },
        delete: async (req, res) => {
            const projectId = req.params.projectId

            try {

                await Project.findByIdAndRemove(projectId)

                return res.send()

            } catch (err) {
                return res.status(400).send({ error: 'Erro ao deletar projeto' })
            }

        }
    }

    return Controller
}

export default ProjectController