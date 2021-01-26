import Task from "../models/Tasks"
import { getPagination } from "../libs/getPagination";

export const findAllTasks = async (req, res) => {
    try {
        // const tasks = await Task.find();
        // res.json(tasks);
        const { page, size, title } = req.query;
        const condition = title ? { 
            title: { $regex: new RegExp(title), $options: "i"} 
        } : {};
        const { limit, offset } = getPagination(page, size);
        const tasks = await Task.paginate(condition, {offset, limit});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong retrieving the tasks'
        })
    }
};

export const findAllDoneTasks = async (req, res) => {
    const tasks = await Task.find({ done: true });
    res.json(tasks);
};

export const findOneTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id)

    if (!task) {
        return res
        .status(404)
        .json({ message: `Task with id ${id} does not exists` })
    }

    res.json(task);
};

export const createTask = async (req, res) => {
    const newtask = new Task({
        title: req.body.title,
        description: req.body.description,
        done: req.body.done ? req.body.done : false
    });
    const taskSaved = await newtask.save();
    res.json(taskSaved);
};

export const updateTask = async (req, res) => {
    res.json(await Task.findByIdAndUpdate(req.params.id, req.body));
};

export const deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task were deleted successfully" });
};