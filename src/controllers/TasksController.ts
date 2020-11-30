import { Request, Response } from 'express';
import db from "../database/connection";

export default class TasksController {
  async index(request: Request, response: Response) {
    const task_id = request.params.taskId;
    const boards = await db('tasks').where('tasks.id', '=', task_id);

    return response.json(boards);
  }

  async createTask(request: Request, response: Response) {
    const {
      name,
      description
    } = request.body;
    const board_id = request.params.boardId;
  
    try {
      await db('tasks').insert({
        name,
        description,
        board_id
      });
    
      return response.status(201).json({
        success: 'Registro salvo'
      });
    } catch(error) {
      return response.status(400).json({
        error: 'Unexpected error while creating new task'
      });
    }
  }

  async updateTask(request: Request, response: Response) {
    const {
      name,
      description,
    } = request.body;
    const board_id = request.params.boardId;
    const task_id = request.params.taskId;
  
    try {
      await db('tasks').where('tasks.id', '=', task_id).update({
        name,
        description,
        board_id,
      });
    
      return response.status(201).json({
        success: 'Registro atualizado'
      });

    } catch(error) {
      return response.status(400).json({
        error: 'Unexpected error while update task'
      });
    }
  }

  async deleteTask(request: Request, response: Response) {
    const task_id = request.params.taskId;
  
    try {
      await db('tasks').where('tasks.id', '=', task_id).delete();
    
      return response.status(201).json({
        success: 'Registro deletado'
      });

    } catch(error) {
      return response.status(400).json({
        error: 'Unexpected error while delete task'
      });
    }
  }
}