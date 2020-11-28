import express from 'express';
import BoardsController from './controllers/BoardsController';
import SprintsController from './controllers/SprintsController';
import TasksController from './controllers/TasksController';

const routes = express.Router();

const sprintsController = new SprintsController();
const boardController = new BoardsController();
const taskController = new TasksController();

routes.get('/sprints', sprintsController.index);
routes.post('/sprints', sprintsController.createSprint);
routes.put('/sprints/:sprintId', sprintsController.updateSprint);
routes.delete('/sprints/:sprintId', sprintsController.deleteSprint);

routes.get('/boards/:sprintId', boardController.index);
routes.post('/boards/:sprintId', boardController.createBoard);
routes.put('/boards/:boardId', boardController.updateBoard);
routes.delete('/boards/:boardId', boardController.deleteBoard);

routes.get('/tasks/:taskId', taskController.index);
routes.post('/tasks/:boardId', taskController.createTask);
routes.put('/tasks/:boardId/:taskId', taskController.updateTask);
routes.delete('/tasks/:taskId', taskController.deleteTask);


export default routes;