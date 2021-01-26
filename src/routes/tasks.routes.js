import {Router} from 'express'

import * as tasksCtrl from "../controllers/tasks.controller";

const router = Router()

router.get('/', tasksCtrl.findAllTasks)

router.get('/done', tasksCtrl.findAllDoneTasks)

router.get('/:id', tasksCtrl.findOneTask)

router.post('/', tasksCtrl.createTask)

router.put('/:id', tasksCtrl.updateTask)

router.delete('/:id', tasksCtrl.deleteTask)


export default router;