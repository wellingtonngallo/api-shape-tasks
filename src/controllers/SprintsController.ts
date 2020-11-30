import { Request, Response } from 'express';
import db from "../database/connection";

export default class SprintsController {
  async findById(request: Request, response: Response) {
    const sprints = await db('sprints').where('sprints.id', '=', request.params.sprintId);

    return response.json(sprints[0]);
  }

  async index(request: Request, response: Response) {
    const sprints = await db('sprints');

    return response.json(sprints);
  }

  async createSprint(request: Request, response: Response) {
    const {
      name,
      description
    } = request.body;
  
    try {
      await db('sprints').insert({
        name,
        description
      });
    
      return response.status(201).json({
        success: 'Registro salvo'
      });
    } catch(error) {
      return response.status(400).json({
        error: 'Unexpected error while creating new sprint'
      });
    }
  }

  async updateSprint(request: Request, response: Response) {
    const {
      name,
      description
    } = request.body;
    const sprint_id = request.params.sprintId;
  
    try {
      await db('sprints').where('sprints.id', '=', sprint_id).update({
        name,
        description,
      });
    
      return response.status(201).json({
        success: 'Registro atualizado'
      });
    } catch(error) {
      return response.status(400).json({
        error: 'Unexpected error while update sprint'
      });
    }
  }

  async deleteSprint(request: Request, response: Response) {
    const sprint_id = request.params.sprintId;
  
    try {
      await db('sprints').where('sprints.id', '=', sprint_id).delete();
    
      return response.status(201).json({
        success: 'Registro deletado'
      });

    } catch(error) {
      return response.status(400).json({
        error: 'Unexpected error while delete sprint'
      });
    }
  }
}