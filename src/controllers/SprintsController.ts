import { Request, Response } from 'express';
import db from "../database/connection";

export default class SprintsController {
  async index(request: Request, response: Response) {
    const boards = await db('sprints');

    return response.json(boards);
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
    
      return response.status(201).send();
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
    
      return response.status(201).send();
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
    
      return response.status(201).send();

    } catch(error) {
      return response.status(400).json({
        error: 'Unexpected error while delete sprint'
      });
    }
  }
}